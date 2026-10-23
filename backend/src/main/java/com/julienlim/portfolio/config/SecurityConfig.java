package com.julienlim.portfolio.config;

import java.io.IOException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ProblemDetail;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.servlet.http.HttpServletResponse;

/**
 * Tout est refusé par défaut ; seules les routes listées ici répondent.
 *
 * L'administration s'authentifie en HTTP Basic à chaque requête, sans session ni cookie : le navigateur
 * n'envoie jamais d'identifiants de lui-même, donc pas de CSRF possible, et la protection CSRF est inutile.
 */
@Configuration
public class SecurityConfig {

    private static final Logger log = LoggerFactory.getLogger(SecurityConfig.class);

    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http, ObjectMapper mapper) throws Exception {
        return http
                .csrf(AbstractHttpConfigurer::disable)
                .sessionManagement(s -> s.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .requestCache(AbstractHttpConfigurer::disable)
                .formLogin(AbstractHttpConfigurer::disable)
                .logout(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(HttpMethod.POST, "/api/contact").permitAll()
                        .requestMatchers("/api/admin/**").hasRole("ADMIN")
                        // Sonde du healthcheck Docker. nginx ne relaie que /api/ : invisible depuis Internet.
                        .requestMatchers(HttpMethod.GET, "/actuator/health/**").permitAll()
                        // Réponses d'erreur produites par Spring après un rejet.
                        .requestMatchers("/error").permitAll()
                        .anyRequest().denyAll())
                .httpBasic(basic -> basic.authenticationEntryPoint((request, response, e) ->
                        // Pas d'en-tête WWW-Authenticate : le navigateur n'ouvre pas sa fenêtre de connexion.
                        writeProblem(response, mapper, HttpStatus.UNAUTHORIZED, "Identifiants requis ou invalides.")))
                .exceptionHandling(ex -> ex.accessDeniedHandler((request, response, e) ->
                        writeProblem(response, mapper, HttpStatus.FORBIDDEN, "Accès refusé.")))
                .build();
    }

    @Bean
    PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    UserDetailsService userDetailsService(PortfolioProperties properties) {
        var admin = properties.admin();
        if (!admin.enabled()) {
            log.warn("ADMIN_PASSWORD_HASH absent : l'administration est fermée");
            return new InMemoryUserDetailsManager();
        }
        return new InMemoryUserDetailsManager(User.withUsername(admin.username())
                .password(admin.passwordHash())
                .roles("ADMIN")
                .build());
    }

    private static void writeProblem(HttpServletResponse response, ObjectMapper mapper, HttpStatus status,
            String detail) throws IOException {
        response.setStatus(status.value());
        response.setContentType(MediaType.APPLICATION_PROBLEM_JSON_VALUE);
        mapper.writeValue(response.getOutputStream(), ProblemDetail.forStatusAndDetail(status, detail));
    }
}
