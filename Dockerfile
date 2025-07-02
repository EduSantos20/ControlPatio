FROM maven:3.9.6-eclipse-temurin-21 AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -X -DskipTests

FROM openjdk:21-jre-slim
FROM eclipse-temurin:21-jre
WORKDIR /app
COPY --from=build ./app/target/*.jar ./controlPatio.jar

ENV PORT=8080

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "controlPatio.jar","--debug"]
