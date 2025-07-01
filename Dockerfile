FROM ubuntu:latest AS build

RUN apt-get update

FROM openjdk:21-jdk-slim

# Instala o git e Maven
RUN apt-get update && apt-get install -y git maven

# Copia o projeto para dentro da imagem
COPY . /app

# Define o diretório de trabalho
WORKDIR /app

# Roda o Maven
RUN mvn clean install

EXPOSE 8080

COPY --from=build /target/ControlPatio-0.0.1-SNAPSHOT.jar /app.jar

ENTRYPOINT [ "java", "-jar", "/app.jar" ]
