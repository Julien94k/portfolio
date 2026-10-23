# Direction artistique

## Brief

Retour de Julien après trois versions : il veut un site **clair, façon page produit Apple (iPhone Air)**,
avec peu de texte et de beaux visuels. Ce brief prime sur toute préférence de style antérieure.
L'historique des versions et de ce qui a été tenté est dans `PLAN.md`.

## Principes

- **Les visuels d'abord, le texte ensuite.** L'accueil montre les applis en grand ; le détail vit
  dans les études de cas et la page `/parcours`.
- **Titres en deux temps**, comme sur apple.com : une affirmation en noir, sa précision en gris
  bleuté (`--ardoise`) sur la ligne suivante.
- **Un seul paragraphe « mots-clés »** sur l'accueil : texte gris, seuls les segments importants en noir.
- **Bandes alternées** blanc / `#F5F5F7` pour rythmer la page, sans filets ni bordures colorées.
- **Les applis dans leur appareil** : navigateur pour un site, iPhone pour une appli mobile. Les projets
  sans capture montrable (Tima, JobRadar, ce portfolio) ont un schéma SVG sur une tuile grise.
- **Fiche technique** : les mesures du Pi en grands chiffres sur des tuiles blanches.

## Couleurs

Thème clair uniquement.

| Jeton | Valeur | Rôle |
|---|---|---|
| `--blanc` | `#FFFFFF` | fond principal |
| `--gris-fond` | `#F5F5F7` | bandes et tuiles |
| `--texte` | `#1D1D1F` | texte, titres |
| `--texte-doux` | `#6E6E73` | texte secondaire, légendes |
| `--ardoise` | `#5C6B7A` | seconde ligne des titres, intro |
| `--bleu` | `#0071E3` | boutons en pilule, accents des schémas |
| `--bleu-lien` | `#0066CC` | liens |
| `--ciel` | `#CFE3F7` | focus, sélection, surlignage des schémas |

## Typographie

Une seule famille : **Onest** (variable, auto-hébergée), la police libre la plus proche de SF Pro.
Titres en demi-gras (600), approche serrée (`-0.02em` à `-0.035em`), texte courant en 17 px.

## Composants

- Boutons en pilule (`.pill`) : plein bleu pour l'action principale, contour bleu pour la secondaire.
- Barre de navigation translucide, floutée, de 48 px.
- Tuiles arrondies (28 px) sur fond gris ou blanc, sans ombre.
- Cadres d'appareils (`DeviceFrames.tsx`) : la seule ombre portée du site, douce, pour les faire flotter.
- Les liens au milieu d'une phrase sont soulignés (accessibilité) ; les liens de navigation non.

## Mouvement

Le visuel d'un projet remonte de 4 px au survol. Aucune animation d'entrée.
`prefers-reduced-motion` coupe tout.

## États

| État | Où | Ce qu'on affiche |
|---|---|---|
| Envoi en cours | Contact | Bouton désactivé, « Envoi en cours… » |
| Erreur de saisie | Contact | Message sous chaque champ fautif, focus sur le premier |
| Succès | Contact | Confirmation qui remplace le formulaire, focus dessus |
| Trop de requêtes | Contact, admin | « Trop d’envois depuis votre connexion. Réessayez dans une minute. » |
| Mesures du Pi indisponibles | Accueil | « … » à la place des chiffres, phrase d'explication |
| Permission | Admin | Formulaire de connexion, « Identifiant ou mot de passe incorrect. » |
| Vide | Admin | « Aucun message pour l’instant. » |

## Sources

- Page iPhone Air d'Apple, observée le 23/10/2026 : https://www.apple.com/fr/iphone-air/
- Skill `frontend-design` d'Anthropic et skill Impeccable (pbakaus), lus le 23/10/2026.
