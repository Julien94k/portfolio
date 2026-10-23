package com.julienlim.portfolio.contact;

import java.time.Clock;
import java.time.Duration;
import java.time.Instant;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.julienlim.portfolio.config.PortfolioProperties;

@Service
public class ContactService {

    private static final Logger log = LoggerFactory.getLogger(ContactService.class);

    private final ContactMessageRepository repository;
    private final ApplicationEventPublisher events;
    private final PortfolioProperties.Contact config;
    private final Clock clock;

    public ContactService(ContactMessageRepository repository, ApplicationEventPublisher events,
            PortfolioProperties properties, Clock clock) {
        this.repository = repository;
        this.events = events;
        this.config = properties.contact();
        this.clock = clock;
    }

    /**
     * Enregistre le message. Un envoi qui ressemble à un robot est ignoré sans erreur : lui répondre
     * autrement qu'à un humain lui apprendrait à contourner le filtre.
     */
    @Transactional
    public void submit(ContactRequest request) {
        if (looksAutomated(request)) {
            log.info("Message de contact ignoré : envoi automatisé probable");
            return;
        }

        Instant now = clock.instant();
        if (repository.countByCreatedAtAfter(now.minus(Duration.ofDays(1))) >= config.maxPerDay()) {
            throw new DailyLimitReachedException();
        }

        var saved = repository.save(new ContactMessage(
                request.name().strip(),
                request.email().strip(),
                blankToNull(request.company()),
                request.message().strip(),
                now));
        // Le contenu du message ne va pas dans les journaux.
        log.info("Message de contact enregistré : {}", saved.getId());
        events.publishEvent(new ContactReceivedEvent(saved.getId()));
    }

    private boolean looksAutomated(ContactRequest request) {
        boolean honeypotFilled = request.website() != null && !request.website().isBlank();
        boolean tooFast = request.elapsedMs() < config.minFillTime().toMillis();
        return honeypotFilled || tooFast;
    }

    private static String blankToNull(String value) {
        return value == null || value.isBlank() ? null : value.strip();
    }
}
