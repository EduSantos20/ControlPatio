FROM ubuntu:latest as build
WORKDIR /app

# Instalar dependências primeiro
RUN apt-get update && \
    apt-get install -y openjdk-21-jdk maven && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Copiar arquivos do projeto
COPY . .

# Compilar o projeto
RUN mvn clean package -DskipTests

# Segunda stage - imagem final
FROM openjdk:21-jre-slim
EXPOSE 8080

# Copiar o JAR compilado
COPY --from=build /app/target/*.jar patio.jar

# Definir o ponto de entrada
ENTRYPOINT ["java", "-jar", "patio.jar", "--debug"]

