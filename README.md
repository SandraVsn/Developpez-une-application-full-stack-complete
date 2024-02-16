# Develop a Full-stack application

 MDD (DevWorld) is the next social network for developers. This version of the application is the Minimal Viable Product (MVP), allowing users to subscribe to programming topics, view a chronological feed of articles, and actively engage through article creation and comments.

## Installation and Execution

### Clone the repository to your local machine:
    ```bash
    git clone https://github.com/SandraVsn/Developpez-une-application-full-stack-complete
    ```

## Database

### Installation

1. Ensure Docker and Docker Compose are installed on your machine.
2. Create a .env file with the necessary variables for the successful launch of the database.
3. Launch the MySQL container with the following command in the project directory:
    ```bash
    docker-compose up --build
    ```

   This will start a MySQL container based on the configuration defined in the `docker-compose.yml`.

## Run Back-end

1. Navigate to the project directory:
    ```bash
    cd back
    ```

2. Install dependencies:
    ```bash
    mvn clean install
    ```

3. Run API :
    ```bash
    mvn spring-boot:run
    ```

## Run Front-end

1. Navigate to the project directory:
    ```bash
    cd front
    ```

2. Install dependencies:
    ```bash
    npm i
    ```

2. Run front-end :
    ```bash
    npm run start
    ```

Application is available at http://localhost:4200

##  Technologies

- Spring Boot 3.1.5
- Angular 17
- REST API
- MySQL
- Docker
- Spring Data JPA
- Swagger
- Spring Security with Jwt and Bcrypt
- Angular Material
- Tailwind css
