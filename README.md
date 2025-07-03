# ControlPatio

Sistema web para controle de cadastro e gerenciamento de motoristas, veículos e operações de carga/descarga em pátios logísticos.

## Funcionalidades

- Cadastro de motoristas com dados pessoais, veículo e operação.
- Listagem de motoristas cadastrados com filtros por tipo de operação, cliente, transportadora e placa.
- Cadastro e autenticação de usuários do sistema.
- Interface web responsiva e moderna.
- Integração com backend em Spring Boot e banco de dados PostgreSQL.
- Operações de CRUD para motoristas e usuários.
- Possibilidade de envio de SMS (estrutura preparada para integração com Twilio).

## Tecnologias Utilizadas

- **Backend:** Java 21, Spring Boot, Spring Data JPA, PostgreSQL
- **Frontend:** HTML5, CSS3, JavaScript puro
- **Build:** Maven
- **Outros:** Lombok, Docker (para build e execução), integração pronta para Twilio

## Estrutura do Projeto

- `src/main/java/com/example/controlPatio/` - Código fonte Java (controllers, services, entities, repositories)
- `src/main/resources/static/` - Arquivos estáticos (HTML, CSS, JS)
- `src/main/resources/application.properties` - Configurações do Spring Boot
- `Dockerfile` - Build e execução em container Docker

## Como Executar

1. **Pré-requisitos:** Java 21, Maven, PostgreSQL
2. Configure o banco de dados PostgreSQL conforme as propriedades em `src/main/resources/application.properties`.
3. Execute o comando abaixo para buildar e rodar o projeto:
   ```sh
   ./mvnw spring-boot:run
   ```
   Ou via Docker:
   ```sh
   docker build -t controlpatio .
   docker run -p 8080:8080 controlpatio
   ```
4. Acesse a aplicação em [http://localhost:8080/login.html](http://localhost:8080/login.html)

## Telas

- **Login:** Autenticação de usuários.
- **Cadastro de Usuário:** Criação de novos usuários do sistema.
- **Cadastro de Motorista:** Formulário completo para cadastro de motoristas, veículos e operação.
- **Listagem:** Tabela com filtros e ações rápidas sobre os cadastros.

## Observações

- O projeto está preparado para integração com envio de SMS via Twilio (ver classe comentada `TwilioConfig`).
- O sistema não possui autenticação JWT/OAuth, mas pode ser facilmente integrado.
- O frontend é puro HTML/CSS/JS, sem frameworks.

## Estrutura de Pastas

Veja a estrutura detalhada do projeto no início deste README.

---

Desenvolvido para fins de colocar em prática o que foi aprendido na aula.