# Portfolio de Julien Lim

Le code de **https://julienhome.com** : mon portfolio de développeur full-stack Java et React.

Le contenu du site est dans le code du front et chaque page est pré-générée en HTML au build : le site
s'affiche immédiatement, se référence bien et reste en ligne même si l'API est arrêtée. L'API Spring
Boot ne sert que ce qui a besoin d'un serveur : le formulaire de contact et la lecture des messages.

```
visiteur ──► Cloudflare (HTTPS) ──► tunnel ──► nginx (pages HTML pré-générées + /api)
                                                 └──► API Spring Boot ──► PostgreSQL
                                                      (contact, admin)
```

## Stack

- **API** : Java 25, Spring Boot 3.5, Spring Security, Spring Data JPA / Hibernate, PostgreSQL 16,
  Flyway, Bean Validation.
- **Front** : React 19, TypeScript, TanStack Query, Vite, rendu statique au build. Polices
  auto-hébergées, aucune ressource tierce.
- **Tests** : JUnit 5, Mockito, MockMvc, Testcontainers (vrai PostgreSQL), JaCoCo.
- **Exploitation** : Docker Compose sur un Raspberry Pi 5, nginx, tunnel Cloudflare, GitHub Actions.

## Sécurité

- Spring Security refuse tout ce qui n'est pas explicitement autorisé. L'administration s'authentifie
  en HTTP Basic à chaque requête (mot de passe haché BCrypt), sans session ni cookie : pas de CSRF possible.
- Formulaire de contact : validation stricte, liste de champs fermée, champ piège, délai minimal de
  saisie, limite de débit par visiteur dans nginx et plafond quotidien global. Messages purgés après un an.
- nginx : CSP stricte sans script ni style en ligne, HSTS, `X-Frame-Options`, `nosniff`,
  `Referrer-Policy`, `Permissions-Policy`. Limites de débit basées sur `CF-Connecting-IP`.
- Conteneurs sans root, système de fichiers en lecture seule, capacités retirées. Ni l'API ni la base
  n'ont de port publié ; nginx n'écoute que sur la boucle locale.

## Lancer le projet

Prérequis : Docker et Docker Compose.

```bash
cp .env.sample .env
openssl rand -hex 24            # à mettre dans DB_PASSWORD
./scripts/set-admin-password.sh # mot de passe de /admin
docker compose up -d --build    # http://localhost:8094
```

### Développement

```bash
docker compose up -d postgres                  # puis, pour l'atteindre hors Docker, publier 5432
cd backend && mvn spring-boot:run              # API sur :8080
cd frontend && npm install && npm run dev      # front sur :3000, /api relayé vers :8080
```

### Tests

```bash
cd backend && mvn verify                       # unitaires + intégration (Docker requis)
cd frontend && npm run lint && npm run build
```

## Design

Choix de typographie, de couleurs et de mise en page, et ce qu'on s'interdit : [`docs/design.md`](docs/design.md).
