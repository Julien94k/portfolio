package com.julienlim.portfolio.contact;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface ContactMessageRepository extends JpaRepository<ContactMessage, UUID> {

    long countByCreatedAtAfter(Instant since);

    List<ContactMessage> findTop500ByOrderByCreatedAtDesc();

    @Modifying
    @Query("delete from ContactMessage m where m.createdAt < :before")
    int deleteCreatedBefore(Instant before);
}
