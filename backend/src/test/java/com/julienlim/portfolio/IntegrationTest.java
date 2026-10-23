package com.julienlim.portfolio;

import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.testcontainers.service.connection.ServiceConnection;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.testcontainers.containers.PostgreSQLContainer;

/**
 * Base des tests d'intégration : vraie base PostgreSQL (même version qu'en production), schéma posé par
 * Flyway. Le conteneur est partagé par toutes les classes de test.
 */
@SpringBootTest
@AutoConfigureMockMvc
public abstract class IntegrationTest {

    protected static final String ADMIN_USER = "admin";
    protected static final String ADMIN_PASSWORD = "mot-de-passe-de-test";

    @ServiceConnection
    static final PostgreSQLContainer<?> POSTGRES = new PostgreSQLContainer<>("postgres:16-alpine");

    static {
        POSTGRES.start();
    }

    @DynamicPropertySource
    static void adminAccount(DynamicPropertyRegistry registry) {
        registry.add("portfolio.admin.username", () -> ADMIN_USER);
        registry.add("portfolio.admin.password-hash", () -> new BCryptPasswordEncoder().encode(ADMIN_PASSWORD));
    }
}
