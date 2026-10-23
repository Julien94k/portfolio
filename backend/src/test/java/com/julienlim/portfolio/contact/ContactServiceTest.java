package com.julienlim.portfolio.contact;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.verifyNoInteractions;
import static org.mockito.Mockito.when;

import java.time.Clock;
import java.time.Duration;
import java.time.Instant;
import java.time.ZoneOffset;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.context.ApplicationEventPublisher;

import com.julienlim.portfolio.config.PortfolioProperties;

@ExtendWith(MockitoExtension.class)
class ContactServiceTest {

    private static final Instant NOW = Instant.parse("2026-10-23T14:00:00Z");

    @Mock
    private ContactMessageRepository repository;
    @Mock
    private ApplicationEventPublisher events;

    private ContactService service;

    @BeforeEach
    void setUp() {
        var properties = new PortfolioProperties(null,
                new PortfolioProperties.Contact(Duration.ofSeconds(3), 2, Duration.ofDays(365)), null, null);
        service = new ContactService(repository, events, properties, Clock.fixed(NOW, ZoneOffset.UTC));
    }

    @Test
    void enregistre_le_message_nettoye_et_publie_un_evenement() {
        when(repository.save(any())).thenAnswer(invocation -> invocation.getArgument(0));

        service.submit(new ContactRequest("  Ada Lovelace ", "ada@example.com ", "   ",
                " Bonjour, je recrute un développeur Java. ", null, 12_000L));

        var saved = ArgumentCaptor.forClass(ContactMessage.class);
        verify(repository).save(saved.capture());
        assertThat(saved.getValue().getName()).isEqualTo("Ada Lovelace");
        assertThat(saved.getValue().getEmail()).isEqualTo("ada@example.com");
        assertThat(saved.getValue().getCompany()).isNull();
        assertThat(saved.getValue().getMessage()).isEqualTo("Bonjour, je recrute un développeur Java.");
        assertThat(saved.getValue().getCreatedAt()).isEqualTo(NOW);
        verify(events).publishEvent(new ContactReceivedEvent(saved.getValue().getId()));
    }

    @Test
    void ignore_sans_erreur_un_envoi_qui_remplit_le_champ_piege() {
        service.submit(new ContactRequest("Bot", "bot@example.com", null, "Achetez nos backlinks", "https://spam.example", 9_000L));

        verifyNoInteractions(repository, events);
    }

    @Test
    void ignore_sans_erreur_un_envoi_trop_rapide_pour_un_humain() {
        service.submit(new ContactRequest("Bot", "bot@example.com", null, "Message envoyé en 400 ms", null, 400L));

        verifyNoInteractions(repository, events);
    }

    @Test
    void refuse_au_dela_du_plafond_quotidien() {
        when(repository.countByCreatedAtAfter(NOW.minus(Duration.ofDays(1)))).thenReturn(2L);

        assertThatThrownBy(() -> service.submit(
                new ContactRequest("Ada", "ada@example.com", null, "Un message parfaitement humain.", null, 10_000L)))
                .isInstanceOf(DailyLimitReachedException.class);
        verify(repository, never()).save(any());
    }
}
