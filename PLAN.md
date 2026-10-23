# Plan : portfolio de Julien Lim

Site personnel publié sur **https://julienhome.com**, hébergé sur le Raspberry Pi 5 de la maison
derrière le tunnel Cloudflare existant. Stack du stage chez Takima : Java 25, Spring Boot 3.5,
Hibernate/JPA, PostgreSQL, Flyway côté API ; React, TypeScript, TanStack Query côté interface.

## Architecture : le backend ne sert que ce qui a besoin d'un serveur

Le contenu d'un portfolio change quelques fois par an : il vit dans le code du front, et chaque page
est pré-générée en HTML statique au build. Le site s'affiche instantanément, se référence bien et
reste en ligne même si l'API est arrêtée.

L'API Spring Boot ne sert que le formulaire de contact et l'administration des messages : valider,
filtrer le spam, stocker, protéger l'accès. C'est là qu'un serveur a une vraie raison d'exister.

```
visiteur ──► Cloudflare (HTTPS) ──► tunnel ──► nginx (pages HTML pré-générées + /api)
                                                 └──► API Spring Boot ──► PostgreSQL
                                                      (contact, admin)
```

## Décisions prises

| Sujet | Choix |
|---|---|
| Adresse | `julienhome.com` (domaine racine), `www` redirigé dessus |
| Contact public | Formulaire + LinkedIn + GitHub. Ni email ni téléphone en clair |
| Recommandation | Extrait de la lettre de Mathilde Lorrain, avec son accord |
| Dépôt | `Julien94k/portfolio`, public |
| Commits | Sans trailer d'attribution IA |

## Sources du contenu

- CV (`~/CV/CV_Julien_Lim_Developpeur_Fullstack.pdf`) : profil, compétences, dates.
- Rapport de stage M2 (ClipShare `Julien/CV/rapport_stage.pdf`) : contributions, anecdotes, recul.
- Dossier de compétences Takima (ClipShare `Julien/CV/2026-07-17_julien_lim.pdf`) : formations.
- Lettre de recommandation (ClipShare `Julien/CV/Lettre de recommandation Julien (1).pdf`).
- GitHub `Julien94k` et les README des projets perso.

Règle : **aucun chiffre qu'on ne peut pas sourcer**. Pas de capture ni de code de Tima (produit
interne de Takima), pas de nom de client, pas de collègue nommé hormis Mathilde Lorrain.

## Ce que veut dire « ne pas faire IA »

Recherche faite (voir `docs/design.md`). Les signes qui trahissent un site généré, et ce qu'on fait
à la place :

| Signe typique | Ce qu'on fait |
|---|---|
| Inter / Geist / Plus Jakarta partout | Une serif de texte pour les titres + une sans humaniste, auto-hébergées |
| Dégradé violet/indigo, texte en dégradé, glassmorphism | Palette de 5 couleurs nommées, chacune avec un rôle, aucun dégradé |
| Crème + terracotta, ou noir + accent néon (2ᵉ vague) | Papier blanc froid, encre bleu-noir, un vert sapin pour les liens |
| Hero centré, badge pilule, deux boutons, 3 cartes à icônes | Texte aligné à gauche, une phrase d'intro à la 1ʳᵉ personne, pas de cartes |
| Fade-up sur chaque section, compteurs animés | Aucune animation d'entrée. Transitions courtes uniquement sur action |
| Libellés en capitales espacées, numéros 01/02/03 décoratifs | Titres simples, numéros seulement pour de vraies séquences |
| « Passionné », « Elevate », « Get started » | Texte écrit avec la voix du rapport : concret, avec les erreurs et ce qu'elles ont appris |
| Emojis, flèches sur chaque lien | Aucun emoji. Liens soulignés, comme sur le web d'avant |

Le détail qui rend le site mémorable : il dit honnêtement où il tourne (« servi depuis un
Raspberry Pi 5 posé chez moi ») et chaque étude de cas raconte un problème réel, avec ce qui a raté.

## Étapes

### 1. Squelette du dépôt
- [x] `git init`, branche `main`
- [x] `.gitignore`, `.editorconfig`
- [x] `.env.sample`, `README.md`, `CLAUDE.md`
- [x] Arborescence : `backend/`, `frontend/`, `docs/`

### 2. Direction artistique
- [x] `docs/design.md` : palette, typographies, grille, ton, liste d'interdits, sources
- [x] Polices auto-hébergées (pas d'appel à Google Fonts : CSP stricte et RGPD), les deux principales préchargées

### 3. API Spring Boot (`backend/`)
- [x] Projet Maven : Spring Boot 3.5.16, Java 25, Web, Data JPA, Validation, Security, Flyway, Actuator
- [x] Schéma Flyway `V1` : `contact_message`
- [x] `POST /api/contact` : validation, champ piège anti-robot, délai minimal de saisie, taille bornée,
      plafond quotidien global
- [x] Purge automatique des messages de plus d'un an (RGPD)
- [x] Admin : `GET/PATCH/DELETE /api/admin/messages`, HTTP Basic + mot de passe haché BCrypt
- [x] Spring Security : tout refusé par défaut, liste blanche explicite, pas de session
- [x] Erreurs au format `ProblemDetail`, sans fuite de pile
- [x] Tests : JUnit 5, Mockito, MockMvc (règles d'accès), Testcontainers PostgreSQL (Flyway + JPA)

### 4. Interface React (`frontend/`)
- [x] Vite + React 19 + TypeScript strict + TanStack Query (contact et admin)
- [x] Contenu typé dans `src/content/`, pages pré-générées en HTML au build (rendu serveur React)
- [x] Page d'accueil : intro, expérience, projets, compétences, formation, recommandation, contact
- [x] Pages d'étude de cas : `/projets/tima`, `/projets/manguessr`, `/projets/portfolio`
- [x] `/admin` : lecture des messages
- [x] Page 404, états chargement / erreur / vide
- [x] Responsive (360 px à 1440 px), thème clair et sombre suivant le système
- [x] Accessibilité : navigation clavier, focus visible, contrastes AA, `prefers-reduced-motion`
- [x] SEO : titre, description, Open Graph, `robots.txt`, `sitemap.xml`

### 5. Sécurité
- [x] nginx : CSP stricte sans `unsafe-inline` pour les scripts, HSTS, nosniff, X-Frame-Options,
      Referrer-Policy, Permissions-Policy, `server_tokens off`
- [x] Limites de débit par IP réelle (`CF-Connecting-IP`) : contact 5/min, admin 30/min
- [x] Redirection HTTPS via `CF-Visitor` (reprise de ManGuessr)
- [x] Conteneurs non root, API et base sans port publié, frontend lié à `127.0.0.1` uniquement
- [x] Secrets dans `.env` (ignoré par git), générés avec `openssl rand`
- [x] `npm audit`, vérification qu'aucun secret n'est commité avant le push

### 6. Docker et déploiement sur le Pi
- [x] Dockerfiles multi-étapes (Maven → JRE, Node → nginx)
- [x] `docker-compose.yml` : healthchecks, mémoire bornée (le Pi a ~2 Go libres), `restart: unless-stopped`
- [x] Build et démarrage sur le Pi, port `127.0.0.1:8094`

### 7. Vérification
- [x] Tests backend verts, lint + build frontend verts
- [x] Rendu contrôlé dans un vrai navigateur : 390 px et 1440 px, clair et sombre
- [x] Lighthouse : 100/100/100/100 en bureau, 97/100/100/100 en mobile 4G simulée, CLS 0
- [x] En-têtes de sécurité vérifiés avec `curl`, formulaire et limites de débit testés
- [x] Revue de code et revue sécurité

### 8. GitHub
- [x] Création de `Julien94k/portfolio` (public), CI GitHub Actions (tests, lint, build, images)
- [x] Push, URL du site renseignée sur le dépôt

### 9. Mise en ligne
- [ ] **Action de Julien** : dashboard Cloudflare, Networking > Tunnels > tunnel du Pi > Routes > Add route >
      Published application. `julienhome.com` puis `www.julienhome.com` → `http://127.0.0.1:8094`
      (pas `localhost` : cloudflared le résout en IPv6, nginx n'écoute qu'en IPv4)
- [ ] Vérification HTTPS publique, en-têtes, formulaire de contact de bout en bout

---

# Version 2 : un portfolio, pas un CV

Retour de Julien après la mise en ligne : le site est impersonnel, on dirait un CV. Recherche faite
sur ce qui rend un portfolio de développeur efficace, puis appliquée ici.

## Ce que dit la recherche

| Recommandation | Source |
|---|---|
| Un recruteur décide en quelques secondes : les projets en premier, pas de longue intro | Scrimba ; slategit |
| Bio « preuve d'abord » de 3 à 5 phrases : ce que je construis, un résultat vérifiable, ce que je cherche. Pas d'adjectifs | slategit |
| 3 à 5 projets, chacun montrant autre chose, dont au moins 2 où l'on a tout décidé, et un qui résout un vrai problème | Scrimba ; Codecademy |
| Chaque projet : capture d'écran, démo et code si possible, décisions expliquées | Scrimba |
| Études de cas : problème, approche, difficultés, résultat, ce qu'on referait autrement | Scrimba |
| Compétences avec contexte (« où je m'en suis servi »), jamais de barres ni de liste brute | Scrimba ; slategit |
| De la personnalité : projets passion, anecdotes, valeurs, sans qu'elle cache le contenu recruteur | Design Diaries ; Elementor |
| Témoignage placé dans le projet concerné, plus crédible qu'isolé | Design Diaries |
| La page « À propos » est la 2ᵉ plus visitée ; la page /now est un bonus, pas une priorité | Design Diaries ; slategit |
| Projets qui ressemblent à de vrais problèmes, pas des clones de tutoriels | jobrise ; OpenClassrooms |

## Ce qui change

- [x] Accueil en une colonne, sans la colonne d'intitulés façon CV. Intro « preuve d'abord » avec le fil
      personnel : je me fabrique les outils qui me manquent
- [x] Projets en premier, avec captures : Tima, ManGuessr, PianoLearn, JobRadar, ce portfolio
- [x] Études de cas PianoLearn et JobRadar (sourcées sur leurs README)
- [x] Section « petits outils » : ClipShare, zip-solver, gamesolver, AI Radar, et ce qui tourne sur le Pi
- [x] Recommandation de Mathilde Lorrain déplacée dans l'étude de cas Tima, rappel court sur l'accueil
- [x] Nouvelle page `/parcours` : la version CV (expérience détaillée, compétences avec contexte, formation)
- [x] Navigation : Projets, Parcours, Contact
- [ ] **Julien** : une photo de lui (facultatif), et relecture des phrases personnelles

---

# Version 3 : le visuel

Retour de Julien sur la v2 : le contenu est mieux, mais le site reste visuellement plat.

## Ce qu'on a observé

Recherche, puis captures de quatre sites de développeurs souvent cités (Maggie Appleton, Rauno
Freiberg, Josh Comeau, Brittany Chiang). Ce qu'ils ont et que ce site n'avait pas :

| Constat | Où |
|---|---|
| Une ouverture en très grande typographie : une phrase sur la personne, en serif de ~100 px | Maggie Appleton, Rauno Freiberg |
| Un élément visuel signature, propre à la personne : illustrations, avatar, forme | Maggie Appleton, Josh Comeau, Rauno Freiberg |
| Chaque contenu a son visuel ; un bloc de texte sans image se lit comme une corvée | Maggie Appleton ; UXfolio |
| Des titres de section grands et légers, qui rythment la page | Maggie Appleton |
| L'œuvre est l'élément le plus fort de la page ; légende sous chaque image | Portfoliobox ; UXfolio |
| Profondeur par des teintes d'une même couleur, sans dégradé | Morningside ; own.page |

## Ce qui change

- [x] Ouverture en grande serif : « Je m'appelle Julien Lim. Je construis des applications web de bout
      en bout, et les outils qui me manquent. »
- [x] Élément signature : un dessin de la carte du Raspberry Pi 5, avec ce qui tourne dessus et des
      mesures en direct (température, jours sans redémarrage, charge) servies par l'API
- [x] `GET /api/status` : lecture de `/sys` et `/proc`, cache de 30 s, route publique ajoutée à
      `SecurityConfig` et testée, limite de débit dans nginx
- [x] Projets en grille, chacun avec son visuel dans un cadre teinté : captures réelles, et
      illustrations dessinées pour Tima (e-mail, LLM, fiche pré-remplie) et JobRadar (radar)
- [x] Citation de Mathilde Lorrain en grand, comme une respiration entre deux sections
- [x] Titres de section plus grands et plus légers
