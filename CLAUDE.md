# CLAUDE.md

Portfolio de Julien Lim, publié sur https://julienhome.com. Vue d'ensemble et commandes : `README.md`.
Plan suivi et état d'avancement : `PLAN.md`. Direction artistique et liste d'interdits : `docs/design.md`.

## Règles

- **Contenu** : il vit dans `frontend/src/content/`. Aucun chiffre qu'on ne peut pas sourcer (CV,
  rapport de stage, README des projets). Pas de capture ni de code de Tima, pas de nom de client ni
  de collègue, hormis Mathilde Lorrain (accord donné pour la citation).
- **Ton** : vouvoiement envers le visiteur, première personne, phrases concrètes. Typographie
  française : espace fine insécable (U+202F) avant `: ; ? !`, apostrophe typographique `’`.
- **Design** : respecter la liste d'interdits de `docs/design.md` (pas de dégradé, pas d'animation
  d'entrée, pas de cartes, pas d'Inter, etc.).
- **Commits** : sans trailer `Co-Authored-By` ni mention d'IA.
- **Sécurité** : toute nouvelle route API doit être ajoutée explicitement à `SecurityConfig` et
  couverte par un test d'accès. Toute ressource tierce casse la CSP de `frontend/nginx/snippets/`.

## Déploiement

Docker Compose sur le Pi : `docker compose up -d --build`. nginx écoute sur `127.0.0.1:8094`, et le
tunnel Cloudflare (géré depuis le dashboard, service `cloudflared` du Pi) relaie `julienhome.com` et
`www.julienhome.com` vers `http://127.0.0.1:8094`. Pas `https://` : nginx ne parle que HTTP. Pas
`localhost` non plus : cloudflared le résout en IPv6 (`[::1]`), alors que nginx n'écoute qu'en IPv4.
Dans le dashboard : Networking > Tunnels > tunnel du Pi > Routes > Add route > Published application.
