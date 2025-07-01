FROM ubuntu:latest AS build

RUN apt-get update
RUN apt-get install maven -y
RUN apt-get install openjdk-21-jdk -y
COPY . .


RUN mvn clean install
FROM openjdk:21-jdk-slim

# Instala o git e Maven
RUN apt-get update && apt-get install -y git maven

# Roda o Maven
RUN mvn clean install

EXPOSE 8080

COPY --from=build /target/ControlPatio-0.0.1-SNAPSHOT.jar app.jar

ENTRYPOINT [ "java", "-jar", "app.jar" ]
