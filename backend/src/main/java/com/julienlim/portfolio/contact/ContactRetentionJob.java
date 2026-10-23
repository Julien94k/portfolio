package com.julienlim.portfolio.contact;

import java.time.Clock;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.julienlim.portfolio.config.PortfolioProperties;

/** Les messages ne sont pas gardés indéfiniment : durée annoncée sous le formulaire (RGPD). */
@Component
public class ContactRetentionJob {

    private static final Logger log = LoggerFactory.getLogger(ContactRetentionJob.class);

    private final ContactMessageRepository repository;
    private final PortfolioProperties.Contact config;
    private final Clock clock;

    public ContactRetentionJob(ContactMessageRepository repository, PortfolioProperties properties, Clock clock) {
        this.repository = repository;
        this.config = properties.contact();
        this.clock = clock;
    }

    @Scheduled(cron = "0 30 3 * * *")
    @Transactional
    public void purgeExpired() {
        int deleted = repository.deleteCreatedBefore(clock.instant().minus(config.retention()));
        if (deleted > 0) {
            log.info("{} message(s) de contact supprimé(s) après la durée de conservation", deleted);
        }
    }
}
