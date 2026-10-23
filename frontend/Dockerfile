FROM node:25-alpine AS build
WORKDIR /app

COPY package*.json ./
# npm ci : installation exacte du package-lock, reproductible d'un build à l'autre.
RUN npm ci

COPY . .
RUN npm run build

# Image nginx qui tourne sans root et écoute sur 8080.
FROM nginxinc/nginx-unprivileged:1.29-alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx/default.conf /etc/nginx/conf.d/default.conf
COPY nginx/snippets /etc/nginx/snippets

EXPOSE 8080
