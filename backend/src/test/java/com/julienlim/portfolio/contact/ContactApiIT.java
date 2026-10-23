package com.julienlim.portfolio.contact;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.time.Instant;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import com.julienlim.portfolio.IntegrationTest;

class ContactApiIT extends IntegrationTest {

    @Autowired
    private MockMvc mvc;
    @Autowired
    private ContactMessageRepository repository;
    @Autowired
    private ContactRetentionJob retentionJob;

    @BeforeEach
    void clean() {
        repository.deleteAll();
    }

    @Test
    void un_message_valide_est_enregistre() throws Exception {
        mvc.perform(post("/api/contact").contentType(MediaType.APPLICATION_JSON).content("""
                {"name": "Ada Lovelace", "email": "ada@example.com", "company": "Analytical Engines",
                 "message": "Bonjour Julien, ton profil m'intéresse.", "website": "", "elapsedMs": 15000}
                """))
                .andExpect(status().isAccepted());

        assertThat(repository.findAll()).singleElement().satisfies(m -> {
            assertThat(m.getName()).isEqualTo("Ada Lovelace");
            assertThat(m.getCompany()).isEqualTo("Analytical Engines");
            assertThat(m.getReadAt()).isNull();
        });
    }

    @Test
    void les_champs_hors_formulaire_sont_ignores() throws Exception {
        mvc.perform(post("/api/contact").contentType(MediaType.APPLICATION_JSON).content("""
                {"name": "Mallory", "email": "mallory@example.com", "message": "Je tente de marquer lu.",
                 "elapsedMs": 15000, "id": "00000000-0000-0000-0000-000000000001",
                 "readAt": "2020-01-01T00:00:00Z", "createdAt": "2020-01-01T00:00:00Z"}
                """))
                .andExpect(status().isAccepted());

        assertThat(repository.findAll()).singleElement().satisfies(m -> {
            assertThat(m.getId().toString()).isNotEqualTo("00000000-0000-0000-0000-000000000001");
            assertThat(m.getReadAt()).isNull();
            assertThat(m.getCreatedAt()).isAfter(Instant.parse("2026-01-01T00:00:00Z"));
        });
    }

    @Test
    void un_message_invalide_renvoie_les_erreurs_par_champ() throws Exception {
        mvc.perform(post("/api/contact").contentType(MediaType.APPLICATION_JSON).content("""
                {"name": "", "email": "pas-une-adresse", "message": "court", "elapsedMs": 15000}
                """))
                .andExpect(status().isBadRequest())
                .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_PROBLEM_JSON))
                .andExpect(jsonPath("$.errors.name").value("Indiquez votre nom."))
                .andExpect(jsonPath("$.errors.email").value("Cette adresse e-mail n’est pas valide."))
                .andExpect(jsonPath("$.errors.message").value("Entre 10 et 4000 caractères."));

        assertThat(repository.count()).isZero();
    }

    @Test
    void un_corps_illisible_est_refuse_sans_detail_interne() throws Exception {
        mvc.perform(post("/api/contact").contentType(MediaType.APPLICATION_JSON).content("{pas du json"))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.trace").doesNotExist());
    }

    @Test
    void la_purge_supprime_les_messages_de_plus_d_un_an() {
        repository.save(new ContactMessage("Ancien", "a@example.com", null, "Message de l'an dernier",
                Instant.now().minusSeconds(400L * 24 * 3600)));
        repository.save(new ContactMessage("Récent", "r@example.com", null, "Message de la semaine",
                Instant.now().minusSeconds(7L * 24 * 3600)));

        retentionJob.purgeExpired();

        assertThat(repository.findAll()).extracting(ContactMessage::getName).containsExactly("Récent");
    }
}
