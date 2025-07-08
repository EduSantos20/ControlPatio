FROM maven:3.9.8-amazoncorretto-21 AS build
WORKDIR /app
COPY . .
RUN mvn clean package -X -DskipTests


FROM openjdk:21-rc-jdk-oracle
WORKDIR /app
COPY --from=build ./app/target/*.jar ./patio.jar
ENTRYPOINT ["java", "-jar", "patio.jar","--debug"]

