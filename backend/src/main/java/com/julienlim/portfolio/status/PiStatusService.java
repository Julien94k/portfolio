package com.julienlim.portfolio.status;

import java.io.IOException;
import java.io.UncheckedIOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.time.Clock;
import java.time.Duration;
import java.time.Instant;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.julienlim.portfolio.config.PortfolioProperties;

/**
 * Lit les mesures dans /sys et /proc. Ces fichiers ne sont pas isolés par Docker : depuis le conteneur,
 * ils décrivent la machine hôte. La lecture est mise en cache, chaque visite ne relit pas le disque.
 */
@Service
public class PiStatusService {

    private static final Logger log = LoggerFactory.getLogger(PiStatusService.class);
    static final Duration CACHE = Duration.ofSeconds(30);

    private final PortfolioProperties.Status config;
    private final Clock clock;

    private PiStatus cached;
    private Instant readAt = Instant.MIN;

    public PiStatusService(PortfolioProperties properties, Clock clock) {
        this.config = properties.status();
        this.clock = clock;
    }

    public synchronized PiStatus current() {
        Instant now = clock.instant();
        if (cached == null || now.isAfter(readAt.plus(CACHE))) {
            cached = read();
            readAt = now;
        }
        return cached;
    }

    private PiStatus read() {
        return new PiStatus(temperature(), (long) firstNumber(config.uptimePath()), firstNumber(config.loadavgPath()));
    }

    /** Le capteur donne des millièmes de degré. Absent sur certaines machines : ce n'est pas une erreur. */
    private Double temperature() {
        try {
            double millis = Double.parseDouble(Files.readString(config.thermalPath()).strip());
            return Math.round(millis / 100.0) / 10.0;
        } catch (IOException | NumberFormatException e) {
            log.debug("Température illisible : {}", e.getMessage());
            return null;
        }
    }

    /** /proc/uptime et /proc/loadavg commencent tous deux par la valeur voulue. */
    private static double firstNumber(Path path) {
        try {
            return Double.parseDouble(Files.readString(path).strip().split("\\s+")[0]);
        } catch (IOException e) {
            throw new UncheckedIOException(e);
        }
    }
}
