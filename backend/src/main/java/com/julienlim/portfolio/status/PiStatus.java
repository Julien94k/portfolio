package com.julienlim.portfolio.status;

/**
 * Quelques mesures du Raspberry Pi qui sert le site, affichées en direct sur l'accueil.
 *
 * @param temperatureCelsius température du processeur, absente si le capteur est illisible
 * @param uptimeSeconds      temps écoulé depuis le dernier démarrage de la machine
 * @param load               charge moyenne sur une minute
 */
public record PiStatus(Double temperatureCelsius, long uptimeSeconds, double load) {
}
