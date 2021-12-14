## Store | Backend

#### Backend Technologies used.

- The backend is built using [Java (Spring boot)](https://spring.io/projects/spring-boot).
- It is running on the [H2 in memory database](https://www.h2database.com/html/main.html).

#### Prerequisites.

- Environments and/or programming language prerequisites.
    - Java JDK: [JDK](https://www.oracle.com/java/technologies/downloads/) preferably download _jdk
      16_ ([download link](https://www.oracle.com/java/technologies/downloads/))
- Editors or IDEs
    - **JAVA Spring IDEs/editors:**
    - _Preferably_: [Intellij](https://www.jetbrains.com/idea/download/)
      link ([download link](https://www.jetbrains.com/idea/))
    - _Alternative_: [Eclipse](https://www.eclipse.org/downloads/)
      link ([download link](https://www.eclipse.org/downloads/))

#### Getting started with the backend.

- clone the repository this URL [GitHub link](https://github.com/FahdJamy/mazon-store)

- navigate / cd into the backend directory `cd backend`
- install backend dependencies by running the command `mvn install`
- alternatively open the backend with your either eclipse or intellij and the dependencies will be installed
  automatically.

#### Running the Backend Application.

navigate to the in each directory for either the backend or the frontend and follow the instructions below for the
specific directory you in.

- Backend:
    ````
    run the backend with intellij IDE.
  
        - Open the backend project with intellij
        - wait for the project (maven) dependencies to be installed / resolved.
        - click on the green play button in the top right corner on the IDE to start the backend.
  
    run the backend in terminal:
  
        - mvn spring-boot:run
  
        Alternatively.
        - java -jar target/app-0.0.1-SNAPSHOT.jar
        - mvn spring-boot:run
    ````

**Running the with docker-compose.**

_**NOTE: please make sure you have docker-compose version that supports version 3.7 installed on your machine.**_

- make sure you are in the `backend` directory
- run docker-compose --build up.
- to access the application, use the url [http://0.0.0.8080](http://0.0.0.8080)

----
**Note**
_To access all the backend swagger url documentation, use the swagger url documentation link format below_

`{{hosturl}}/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config`

For example:
- after running the backend, access the swagger documentation with the following url:
````
http://localhost:8080/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config
````

or click the link below:

[link](http://localhost:8080/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config)

-----

### Notes about the backend application.

- The application can only be accessed or used by three types of users.
    - `BUYER`
    - `SELLER`
    - `ADMIN`
- Only two types of users can register to the application **BUYER/SELLER** via the register page.
- The **ADMIN** user type is created automatically with the credentials.
    - `password: admin`
    - `username: admin`
- Below are open (non-auth-required) url endpoints/routes
  - swagger api url: `{{hosturl}}/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config`; Method: **GET**
  - login url: `{{hosturl}}/auth/login`: Method: **GET**
  - registration url: `{{hosturl}}/users`: Method: **POST**
- All the other endpoints require a JWT **_Bearer token_**
