FROM maven:3.9-eclipse-temurin-26-alpine AS build
WORKDIR /app

COPY pom.xml ./
# Couche de cache : les dépendances ne sont retéléchargées que si le pom change.
RUN mvn -B -ntp dependency:go-offline

COPY src ./src
# Les tests tournent en CI (ils ont besoin de Docker pour PostgreSQL) : pas dans l'image.
RUN mvn -B -ntp package -DskipTests

FROM eclipse-temurin:25-jre-alpine
WORKDIR /app
# Utilisateur dédié : une faille dans l'appli ne donne pas root dans le conteneur.
RUN addgroup -S portfolio && adduser -S -G portfolio portfolio
COPY --from=build /app/target/portfolio-api.jar app.jar
USER portfolio

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
