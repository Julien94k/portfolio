package com.julienlim.portfolio.config;

import java.time.Duration;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "portfolio")
public record PortfolioProperties(Admin admin, Contact contact, Notify notifications) {

    /** Compte unique de l'administration. Sans empreinte, l'administration est fermée. */
    public record Admin(String username, String passwordHash) {

        public boolean enabled() {
            return passwordHash != null && !passwordHash.isBlank();
        }
    }

    public record Contact(Duration minFillTime, int maxPerDay, Duration retention) {
    }

    /** Notification push ntfy à chaque nouveau message. Sans topic, rien n'est envoyé. */
    public record Notify(String ntfyUrl, String ntfyTopic, String adminUrl) {

        public boolean enabled() {
            return ntfyTopic != null && !ntfyTopic.isBlank();
        }
    }
}
