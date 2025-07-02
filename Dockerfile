FROM ubuntu:latest AS build

RUN apt-get update
RUN apt-get install maven -y
RUN apt-get install openjdk-17-jdk -y
COPY . .

FROM openjdk:17-jdk-slim
RUN mvn clean package -DskipTests
# Instala o git e Maven
RUN apt-get update && apt-get install -y git maven


EXPOSE 8080
COPY --from=builder /app/target/*.jar app.jar

ENTRYPOINT [ "java", "-jar", "app.jar" ]
