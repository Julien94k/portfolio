package com.julienlim.portfolio.contact;

import java.net.http.HttpClient;
import java.nio.charset.StandardCharsets;
import java.time.Duration;
import java.util.Base64;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.client.JdkClientHttpRequestFactory;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;
import org.springframework.transaction.event.TransactionalEventListener;
import org.springframework.web.client.RestClient;
import org.springframework.web.client.RestClientException;

import com.julienlim.portfolio.config.PortfolioProperties;

/**
 * Prévient sur le téléphone (application ntfy) qu'un message attend. Ni le nom ni le contenu ne
 * partent chez ntfy : seulement le fait qu'il y a un message, et le lien vers l'administration.
 */
@Component
public class ContactNotifier {

    private static final Logger log = LoggerFactory.getLogger(ContactNotifier.class);
    private static final String TITLE = "Nouveau message sur le portfolio";

    private final RestClient http;
    private final PortfolioProperties.Notify config;

    public ContactNotifier(RestClient.Builder builder, PortfolioProperties properties) {
        var client = HttpClient.newBuilder().connectTimeout(Duration.ofSeconds(3)).build();
        var factory = new JdkClientHttpRequestFactory(client);
        factory.setReadTimeout(Duration.ofSeconds(5));
        this.http = builder.requestFactory(factory).build();
        this.config = properties.notifications();
    }

    /** Après validation de la transaction, hors du fil de la requête : ntfy lent ne ralentit pas le formulaire. */
    @Async
    @TransactionalEventListener
    public void onContactReceived(ContactReceivedEvent event) {
        if (!config.enabled()) {
            return;
        }
        try {
            http.post()
                    .uri(config.ntfyUrl().replaceAll("/+$", "") + "/" + config.ntfyTopic())
                    // Les en-têtes HTTP sont en ISO-8859-1 : titre encodé (RFC 2047) pour garder les accents.
                    .header("Title", "=?UTF-8?B?" + Base64.getEncoder()
                            .encodeToString(TITLE.getBytes(StandardCharsets.UTF_8)) + "?=")
                    .header("Click", config.adminUrl())
                    .header("Tags", "envelope")
                    .body("Ouvre l'administration pour le lire.".getBytes(StandardCharsets.UTF_8))
                    .retrieve()
                    .toBodilessEntity();
        } catch (RestClientException e) {
            // Le message est déjà en base : une notification ratée ne doit rien casser.
            log.warn("Notification ntfy impossible : {}", e.getMessage());
        }
    }
}
