#!/usr/bin/env bash
# Choisit le mot de passe de /admin : seule son empreinte BCrypt est écrite dans .env.
# Le mot de passe est lu sur l'entrée standard, jamais passé en argument (il serait visible dans ps).
set -euo pipefail
cd "$(dirname "$0")/.."

[[ -f .env ]] || { echo "Pas de .env : cp .env.sample .env d'abord." >&2; exit 1; }
user=$(grep -E '^ADMIN_USERNAME=' .env | cut -d= -f2-)
user=${user:-julien}

if [[ -t 0 ]]; then
  read -rsp "Mot de passe pour « $user » : " password; echo
  read -rsp "Encore une fois : " confirm; echo
  [[ "$password" == "$confirm" ]] || { echo "Les deux saisies diffèrent." >&2; exit 1; }
else
  read -r password
fi
(( ${#password} >= 12 )) || { echo "12 caractères au minimum." >&2; exit 1; }

hash=$(printf '%s' "$password" | docker run --rm -i --quiet httpd:2.4-alpine htpasswd -niBC 11 "$user" | cut -d: -f2-)
# Guillemets simples : Docker Compose n'interprète pas les « $ » de l'empreinte.
sed -i "s|^ADMIN_PASSWORD_HASH=.*|ADMIN_PASSWORD_HASH='${hash}'|" .env
echo "Empreinte enregistrée. Pour l'appliquer : docker compose up -d api"
