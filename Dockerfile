FROM ubuntu:latest as build

RUN apt-get update
RUN apt-get install openjdk-21-jdk -y
COPY . .

RUN apt-get install maven -y
RUN mvn clean install -DskipTests

FROM openjdk:21-jre-slim
EXPOSE 8080

COPY --from=build ./app/target/target/ControlPatio-0.0.1-SNAPSHOT.jar patio.jar
ENTRYPOINT ["java", "-jar", "patio.jar","--debug"]

