# Direction artistique

## Intention

Un recruteur ou un tech lead arrive depuis le CV ou LinkedIn. On le vouvoie. En dix secondes, il doit savoir qui je
suis, ce que je cherche et ce que j'ai livré. S'il reste, il doit pouvoir lire comment je travaille,
pas une liste d'adjectifs.

Ton : celui d'un carnet de développeur bien tenu. Sobre, précis, à la première personne. On montre
le travail réel, y compris ce qui a raté et ce que j'en ai tiré.

Le détail mémorable : le site dit où il tourne (un Raspberry Pi 5 chez moi) et quand il a été mis à
jour pour la dernière fois. Les faits importants sont surlignés comme au stabilo, avec parcimonie.

## Ce qu'on s'interdit

Ces motifs sont devenus la signature des sites générés par IA. Sources en bas de page.

- Inter, Geist, Plus Jakarta Sans, Roboto ; monospace décoratif pour les petits libellés.
- Dégradés (fond, bouton, texte), glassmorphism, halos, blobs décoratifs.
- Violet/indigo, crème + terracotta, noir + accent néon.
- Hero centré avec badge pilule et deux boutons ; grilles de trois cartes à icônes ; cartes dans des cartes.
- Libellés en capitales espacées au-dessus des titres ; numéros 01/02/03 sur ce qui n'est pas une séquence.
- Animation d'apparition sur chaque section, compteurs qui défilent, rebonds.
- Emojis, flèches sur chaque lien, chaînes « A · B · C » décoratives.
- Vocabulaire creux : « passionné », « solutions innovantes », « élever », « Get started ».
- Tout chiffre qu'on ne peut pas sourcer.

## Typographie

| Rôle | Police | Pourquoi |
|---|---|---|
| Titres, citations | Source Serif 4 (variable) | Serif de texte sobre, lisible à l'écran, rare dans les gabarits |
| Texte courant, interface | Public Sans (variable) | Sans humaniste neutre, conçue pour les services publics |
| Code | Monospace système | Uniquement pour du vrai code |

Les deux polices sont auto-hébergées (`@fontsource-variable`), en WOFF2, sous-ensemble latin.

Échelle : 1rem = 17px de texte courant, interligne 1.6, colonne de lecture limitée à 68 caractères.
Titres : 2.1rem / 1.5rem / 1.15rem. Pas d'échelle « tout en Tailwind ».

## Couleurs

Cinq couleurs, chacune avec un rôle. Pas de dégradé.

| Nom | Clair | Sombre | Rôle |
|---|---|---|---|
| papier | `#F5F6F3` | `#15191E` | fond |
| encre | `#1B2430` | `#E4E7E2` | texte, titres |
| crayon | `#505A66` | `#A3ACB5` | texte secondaire, dates |
| filet | `#D5DAD4` | `#2C333B` | séparateurs, bordures |
| sapin | `#1D5C47` | `#86C9AE` | liens, focus, action principale |
| stabilo | `#F3E58C` | `#5A5222` | surlignage de quelques faits (fond du `<mark>`) |

Contrastes visés (AA) : encre/papier > 12:1, crayon/papier > 6:1, sapin/papier > 7:1.

## Mise en page

- Alignement à gauche partout. Pas de hero centré.
- Accueil en une seule colonne de lecture, dans cet ordre : intro « preuve d'abord », projets avec
  leur capture, petits outils, contact. Les titres de section sont des phrases (« Ce que j'ai construit »).
- La page `/parcours` garde la mise en page CV : intitulés dans une colonne étroite à gauche,
  contenu à droite. Sur mobile, l'intitulé passe au-dessus.
- Projets : texte à gauche, capture à droite. Une capture de téléphone reste étroite.
- Les sections sont séparées par un filet, pas par des cartes.
- Les liens sont soulignés. Le soulignement s'épaissit au survol.
- Navigation : une ligne de liens en haut, qui reste en place au défilement.

## Mouvement

Aucune animation d'entrée. Seules transitions : couleur et soulignement au survol (120 ms), teinte du
cadre d'un projet au survol, et l'état d'envoi du formulaire. Une seule animation : la diode
d'activité du Pi clignote quand les mesures arrivent. `prefers-reduced-motion` coupe tout.

## Illustrations et élément signature

- L'ouverture est une phrase en grande serif (jusqu'à 4 rem), le nom en gras : la typographie fait
  le visuel, comme chez Maggie Appleton ou Rauno Freiberg.
- L'élément signature est le Raspberry Pi 5 qui sert le site : dessiné en SVG aux proportions de la
  vraie carte, avec trois mesures en direct (`/api/status`).
- Chaque projet a un visuel dans un cadre teinté (`--teinte`) : sa vraie capture, ou un schéma
  dessiné quand il n'y a rien de montrable (Tima, JobRadar, ce portfolio).
- Les schémas n'utilisent que les couleurs du site, par des classes CSS : ils suivent le thème sombre.
  Traits de 1,5 px, bouts arrondis, le stabilo pour ce qui est pré-rempli ou retenu.

## États

Le contenu est pré-rendu en HTML : il n'a ni chargement ni erreur. Les états concernent le formulaire
de contact et l'administration.

| État | Où | Ce qu'on affiche |
|---|---|---|
| Envoi en cours | Contact | Bouton désactivé, « Envoi en cours… » |
| Erreur de saisie | Contact | Message sous chaque champ fautif, focus sur le premier |
| Succès | Contact | Confirmation qui remplace le formulaire, focus dessus, bouton « Écrire un autre message » |
| Trop de requêtes | Contact, admin | « Trop d’envois depuis votre connexion. Réessayez dans une minute. » |
| Serveur injoignable | Contact, admin | Phrase claire, lien LinkedIn en recours |
| Permission | Admin | Formulaire de connexion, « Identifiant ou mot de passe incorrect. » |
| Chargement | Admin | « Chargement des messages… » |
| Vide | Admin | « Aucun message pour l’instant. » |
| Erreur | Admin | Message et bouton « Réessayer » |

## Sources

- [How to Fix AI Slop in Web Design, Tell by Tell](https://capitalandcompute.net/blog/fix-ai-slop-design/)
- [AI Slop Fonts and Gradients: The Tells That Give Away AI Design](https://www.925studios.co/blog/ai-slop-design-tells)
- [Why Your AI Keeps Building the Same Purple Gradient Website](https://prg.sh/ramblings/Why-Your-AI-Keeps-Building-the-Same-Purple-Gradient-Website)
- [Anti AI slop ban list](https://github.com/Laith0003/ux-skill/wiki/Anti-AI-slop-ban-list.md)
- [Did the 2026 Web Design Trends Predictions Come True?](https://graphicdesignjunction.com/2026/08/did-the-2026-web-design-trends-predictions-come-true/)
