package com.julienlim.portfolio.contact;

import java.time.Instant;
import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "contact_message")
public class ContactMessage {

    @Id
    private UUID id;

    @Column(nullable = false, length = 100)
    private String name;

    @Column(nullable = false, length = 254)
    private String email;

    @Column(length = 120)
    private String company;

    @Column(nullable = false, length = 4000)
    private String message;

    @Column(name = "created_at", nullable = false)
    private Instant createdAt;

    @Column(name = "read_at")
    private Instant readAt;

    protected ContactMessage() {
        // Requis par JPA
    }

    public ContactMessage(String name, String email, String company, String message, Instant createdAt) {
        this.id = UUID.randomUUID();
        this.name = name;
        this.email = email;
        this.company = company;
        this.message = message;
        this.createdAt = createdAt;
    }

    /** Idempotent : un message déjà lu garde sa première date de lecture. */
    public void markRead(Instant now) {
        if (readAt == null) {
            readAt = now;
        }
    }

    public UUID getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    public String getCompany() {
        return company;
    }

    public String getMessage() {
        return message;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public Instant getReadAt() {
        return readAt;
    }
}
