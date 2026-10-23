package com.julienlim.portfolio.contact;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import jakarta.validation.constraints.Size;

/**
 * Corps du formulaire de contact. Liste de champs fermée : rien d'autre ne peut être fixé par le client
 * (ni identifiant, ni date, ni statut de lecture).
 *
 * @param website   champ piège, caché aux humains : un robot qui remplit tout le renseigne
 * @param elapsedMs temps passé sur le formulaire, mesuré par la page
 */
public record ContactRequest(
        @NotBlank(message = "Indiquez votre nom.")
        @Size(max = 100, message = "100 caractères au maximum.")
        String name,

        @NotBlank(message = "Indiquez votre adresse e-mail.")
        @Email(message = "Cette adresse e-mail n’est pas valide.")
        @Size(max = 254, message = "254 caractères au maximum.")
        String email,

        @Size(max = 120, message = "120 caractères au maximum.")
        String company,

        @NotBlank(message = "Écrivez votre message.")
        @Size(min = 10, max = 4000, message = "Entre 10 et 4000 caractères.")
        String message,

        @Size(max = 200)
        String website,

        @NotNull
        @PositiveOrZero
        Long elapsedMs) {
}
