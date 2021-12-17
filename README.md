## The Mini Market Store.

This is an online store intended for users (SELLERS) to advertise and sell their products to other users (BUYERS)

### Technologies used.

- The application is built using [React.js](https://reactjs.org/) for the frontend
  and [Java (Spring boot)](https://spring.io/projects/spring-boot) in the backend.
- It is running on the [H2 in memory database](https://www.h2database.com/html/main.html).
- Images for both the frontend and backend can be created using [docker](https://www.docker.com/) files for both the
  frontend and backend.

### Prerequisites.

- Environments and/or programming language prerequisites.
    - JavaScript: [Node.js](https://nodejs.org/en/) preferably download _v10_ ([download link](https://nodejs.org/en/))
    - Java JDK: [JDK](https://www.oracle.com/java/technologies/downloads/) preferably download _jdk
      16_ ([download link](https://www.oracle.com/java/technologies/downloads/))
- Editors or IDEs
    - **JAVA Spring IDEs/editors:**
    - _Preferably_: [Intellij](https://www.jetbrains.com/idea/download/)
      link ([download link](https://www.jetbrains.com/idea/))
    - _Alternative_: [Eclipse](https://www.eclipse.org/downloads/)
      link ([download link](https://www.eclipse.org/downloads/))
    - **JavaScript IDEs/editors:**
    - _Preferably_: [VSCode](https://code.visualstudio.com/) link ([download link](https://code.visualstudio.com))
    - _Alternative_: [Web Storm](https://www.jetbrains.com/webstorm/download/)
      link ([download link](https://www.jetbrains.com/webstorm/download/))

### Getting started.

- clone the repository this URL [GitHub link](https://github.com/FahdJamy/mazon-store)

  ##### Frontend.

- navigate / cd into the frontend directory `cd frontend`
- install the frontend dependencies by running the command `npm install` or `yarn`

  ##### Backend.

- navigate / cd into the backend directory `cd backend`
- install backend dependencies by running the command `mvn install`
- alternatively open the backend with your either eclipse or intellij and the dependencies will be installed
  automatically.

### Running the Application.

**Run the application.**

navigate to the in each directory for either the backend or the frontend and follow the instructions below for the
specific directory you in.

- Frontend:
    ````
    run the frontend with one of the following commands depending on your application manager:
  
      NPM
      - npm start
      YARN
      - yarn start
    ````

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

----
**Note**
_To access all the backend url documentation, use the swagger url documentation link format below_

`{{hosturl}}/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config`

For example:
- after running the backend, access the swagger documentation with the following url:
````
http://localhost:8080/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config
````

or click the link below:

[link](http://localhost:8080/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config)

-----
### Notes about the application.

- The application can only be accessed or used by three types of users.
    - `BUYER`
    - `SELLER`
    - `ADMIN`
- Only two types of users can register to the application **BUYER/SELLER** via the register page.
- The **ADMIN** user type is created automatically with the credentials.
    - `password: admin`
    - `username: admin`
- Users will be redirected automatically to their pages / dashboards basing on their roles. _**all pages not authorized
  for them are blocked from their access**_.


##### IMPORTANT!
*Please add an email_address and email_password in the properties spring:mail sections

or export an EMAIL_USERNAME value e.g =`export EMAIL_USERNAME=your.email.com` and EMAIL_PASSWORD e.g = 
`export EMAIL_PASSWORD=password` in your terminal or environment variables for windows.

_if not set, when approving a seller the backend will throw an exception_.*

### For more documentation.

- **FRONTEND**: Refer to [Frontend README.md](./frontend/README.md) file for more info about frontend.
- **BACKEND**: Refer to [Backend README.md](./backend/README.md) file for more info about the backend.

---------

#### Special thanks to team.

<h4 align="left">
<ins>
The Professor / Project Manager
</ins>
</h4>

| Name                    | Role                                                                      | Bio                                                                                                                                                               |
|-----------------------|------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [Muhyieddin Al-tarawneh](https://github.com/muhyidean/)  |  WAA professor/lecturer / project manager.| Professor of Computer Science<br/> B.S., Mutah University<br/>M.S, Middle East University<br/>Ph.D candidate, University of Jordan<br/>Email: maltarawneh@***.edu |

<h4 align="left">
<ins>
Contributors
</ins>
</h4>

| Name              | S-ID   | Role                  | GitHub                               |
|-------------------|--------|-----------------------|--------------------------------------|
| Solomon Kabaliisa | 613456 | Developer / Team lead | [link](https://github.com/kabaliisa) |
| Joshua Mugisha    | 613416 | Developer             | [link](https://github.com/joshNic)   |
| Bashir Katugga    | 613453 | Developer             | [link](https://github.com/bashirkatugga)|
| Lucy Turihabwe    | 613439 | Developer  | [link](https://github.com/lturihabwe)|
| Fahad Asiimwe     | 613464 | Developer  | [fahdjamy](https://github.com/fahdjamy)|

