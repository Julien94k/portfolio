package com.julienlim.portfolio.status;

import static org.assertj.core.api.Assertions.assertThat;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.time.Clock;
import java.time.Instant;
import java.time.ZoneId;
import java.time.ZoneOffset;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.io.TempDir;

import com.julienlim.portfolio.config.PortfolioProperties;

class PiStatusServiceTest {

    @TempDir
    Path dir;

    private Path thermal;
    private Path uptime;
    private Path loadavg;

    @BeforeEach
    void setUp() throws IOException {
        thermal = Files.writeString(dir.resolve("temp"), "50712\n");
        uptime = Files.writeString(dir.resolve("uptime"), "7210237.70 28470057.72\n");
        loadavg = Files.writeString(dir.resolve("loadavg"), "0.40 0.24 0.23 1/1065 1293\n");
    }

    private PiStatusService service(Clock clock) {
        var properties = new PortfolioProperties(null, null, null,
                new PortfolioProperties.Status(thermal, uptime, loadavg));
        return new PiStatusService(properties, clock);
    }

    @Test
    void lit_temperature_duree_et_charge() {
        var status = service(Clock.systemUTC()).current();

        assertThat(status.temperatureCelsius()).isEqualTo(50.7);
        assertThat(status.uptimeSeconds()).isEqualTo(7_210_237L);
        assertThat(status.load()).isEqualTo(0.40);
    }

    @Test
    void sans_capteur_la_temperature_est_absente_mais_le_reste_repond() throws IOException {
        Files.delete(thermal);

        var status = service(Clock.systemUTC()).current();

        assertThat(status.temperatureCelsius()).isNull();
        assertThat(status.uptimeSeconds()).isEqualTo(7_210_237L);
    }

    @Test
    void les_mesures_sont_gardees_trente_secondes() throws IOException {
        var clock = new MutableClock(Instant.parse("2026-10-23T12:00:00Z"));
        var service = service(clock);
        service.current();

        Files.writeString(thermal, "61000");
        clock.advanceSeconds(20);
        assertThat(service.current().temperatureCelsius()).isEqualTo(50.7);

        clock.advanceSeconds(15);
        assertThat(service.current().temperatureCelsius()).isEqualTo(61.0);
    }

    private static final class MutableClock extends Clock {

        private Instant now;

        MutableClock(Instant now) {
            this.now = now;
        }

        void advanceSeconds(long seconds) {
            now = now.plusSeconds(seconds);
        }

        @Override
        public ZoneId getZone() {
            return ZoneOffset.UTC;
        }

        @Override
        public Clock withZone(ZoneId zone) {
            return this;
        }

        @Override
        public Instant instant() {
            return now;
        }
    }
}
