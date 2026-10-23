package com.julienlim.portfolio.status;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.springframework.test.web.servlet.MockMvc;

import com.julienlim.portfolio.IntegrationTest;

class PiStatusApiIT extends IntegrationTest {

    @Autowired
    private MockMvc mvc;

    /** Fichiers factices : la machine de CI n'a pas forcément de capteur de température. */
    @DynamicPropertySource
    static void fakeProcFiles(DynamicPropertyRegistry registry) throws IOException {
        Path dir = Files.createTempDirectory("pi-status");
        registry.add("portfolio.status.thermal-path", () -> write(dir, "temp", "48250"));
        registry.add("portfolio.status.uptime-path", () -> write(dir, "uptime", "86400.5 1000.0"));
        registry.add("portfolio.status.loadavg-path", () -> write(dir, "loadavg", "0.12 0.10 0.08 1/200 42"));
    }

    private static String write(Path dir, String name, String content) {
        try {
            return Files.writeString(dir.resolve(name), content).toString();
        } catch (IOException e) {
            throw new IllegalStateException(e);
        }
    }

    @Test
    void les_mesures_sont_publiques_en_lecture() throws Exception {
        mvc.perform(get("/api/status"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.temperatureCelsius").value(48.3))
                .andExpect(jsonPath("$.uptimeSeconds").value(86400))
                .andExpect(jsonPath("$.load").value(0.12));
    }

    @Test
    void elles_ne_s_ecrivent_pas() throws Exception {
        mvc.perform(post("/api/status")).andExpect(status().isUnauthorized());
    }
}
