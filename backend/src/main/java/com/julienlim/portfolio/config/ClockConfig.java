package com.julienlim.portfolio.config;

import java.time.Clock;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ClockConfig {

    /** Horloge injectée : les tests figent le temps au lieu d'attendre. */
    @Bean
    Clock clock() {
        return Clock.systemUTC();
    }
}
