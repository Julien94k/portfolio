package com.julienlim.portfolio.admin;

import java.time.Instant;
import java.util.UUID;

import com.julienlim.portfolio.contact.ContactMessage;

public record AdminMessageView(
        UUID id, String name, String email, String company, String message, Instant createdAt, Instant readAt) {

    static AdminMessageView from(ContactMessage m) {
        return new AdminMessageView(
                m.getId(), m.getName(), m.getEmail(), m.getCompany(), m.getMessage(), m.getCreatedAt(), m.getReadAt());
    }
}
