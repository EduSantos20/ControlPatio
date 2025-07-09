FROM ubuntu:latest as build
WORKDIR /app
RUN apt-get update
RUN apt-get install openjdk-21-jdk -y
COPY . .
RUN mvn package -DskipTests

RUN apt-get install maven -y
RUN mvn clean install -DskipTests

FROM openjdk:21-ea-1-oracle
EXPOSE 8080

COPY --from=build ./app/target/*.jar patio.jar
ENTRYPOINT ["java", "-jar", "patio.jar","--debug"]

