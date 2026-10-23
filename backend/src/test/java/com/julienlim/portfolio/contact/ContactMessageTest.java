package com.julienlim.portfolio.contact;

import static org.assertj.core.api.Assertions.assertThat;

import java.time.Instant;

import org.junit.jupiter.api.Test;

class ContactMessageTest {

    @Test
    void la_premiere_lecture_fait_foi() {
        var message = new ContactMessage("Ada", "ada@example.com", null, "Bonjour Julien", Instant.EPOCH);
        var first = Instant.parse("2026-10-01T10:00:00Z");

        message.markRead(first);
        message.markRead(Instant.parse("2026-10-02T10:00:00Z"));

        assertThat(message.getReadAt()).isEqualTo(first);
    }
}
