package com.julienlim.portfolio.admin;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.httpBasic;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.patch;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.header;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.time.Instant;
import java.util.UUID;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.web.servlet.MockMvc;

import com.julienlim.portfolio.IntegrationTest;
import com.julienlim.portfolio.contact.ContactMessage;
import com.julienlim.portfolio.contact.ContactMessageRepository;

class AdminApiIT extends IntegrationTest {

    @Autowired
    private MockMvc mvc;
    @Autowired
    private ContactMessageRepository repository;

    private ContactMessage older;
    private ContactMessage newer;

    @BeforeEach
    void seed() {
        repository.deleteAll();
        older = repository.save(new ContactMessage("Ada", "ada@example.com", null, "Premier message",
                Instant.parse("2026-10-01T09:00:00Z")));
        newer = repository.save(new ContactMessage("Grace", "grace@example.com", "Navy", "Second message",
                Instant.parse("2026-10-02T09:00:00Z")));
    }

    @Test
    void sans_identifiants_la_liste_est_refusee_sans_fenetre_du_navigateur() throws Exception {
        mvc.perform(get("/api/admin/messages"))
                .andExpect(status().isUnauthorized())
                .andExpect(header().doesNotExist("WWW-Authenticate"))
                .andExpect(jsonPath("$.detail").value("Identifiants requis ou invalides."));
    }

    @Test
    void un_mauvais_mot_de_passe_est_refuse() throws Exception {
        mvc.perform(get("/api/admin/messages").with(httpBasic(ADMIN_USER, "mauvais")))
                .andExpect(status().isUnauthorized());
    }

    @Test
    void l_admin_voit_les_messages_du_plus_recent_au_plus_ancien() throws Exception {
        mvc.perform(get("/api/admin/messages").with(httpBasic(ADMIN_USER, ADMIN_PASSWORD)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].name").value("Grace"))
                .andExpect(jsonPath("$[0].company").value("Navy"))
                .andExpect(jsonPath("$[1].name").value("Ada"));
    }

    @Test
    void l_admin_marque_un_message_comme_lu() throws Exception {
        mvc.perform(patch("/api/admin/messages/{id}/read", older.getId()).with(httpBasic(ADMIN_USER, ADMIN_PASSWORD)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.readAt").exists());

        assertThat(repository.findById(older.getId())).get().extracting(ContactMessage::getReadAt).isNotNull();
    }

    @Test
    void l_admin_supprime_un_message() throws Exception {
        mvc.perform(delete("/api/admin/messages/{id}", newer.getId()).with(httpBasic(ADMIN_USER, ADMIN_PASSWORD)))
                .andExpect(status().isNoContent());

        assertThat(repository.findById(newer.getId())).isEmpty();
    }

    @Test
    void un_message_inconnu_renvoie_404() throws Exception {
        mvc.perform(delete("/api/admin/messages/{id}", UUID.randomUUID()).with(httpBasic(ADMIN_USER, ADMIN_PASSWORD)))
                .andExpect(status().isNotFound());
    }

    @Test
    void une_route_non_declaree_est_refusee_meme_pour_l_admin() throws Exception {
        mvc.perform(get("/api/contact").with(httpBasic(ADMIN_USER, ADMIN_PASSWORD)))
                .andExpect(status().isForbidden());
    }

    @Test
    void la_sonde_de_sante_repond() throws Exception {
        mvc.perform(get("/actuator/health/liveness")).andExpect(status().isOk());
    }
}
