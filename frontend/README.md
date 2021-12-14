## Store | Frontend

#### Technologies used.

**Note**: _This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app)._

- The application is built using [React.js](https://reactjs.org/) for the frontend.
- The frontend image can be created using the [docker](https://www.docker.com/) files in the `frontend` directory.

#### Prerequisites.

- Environments and/or programming language prerequisites.
    - JavaScript: [Node.js](https://nodejs.org/en/) preferably download _v10_ ([download link](https://nodejs.org/en/))
- Editors or IDEs
    - **JavaScript IDEs/editors:**
    - _Preferably_: [VSCode](https://code.visualstudio.com/) link ([download link](https://code.visualstudio.com))
    - _Alternative_: [Web Storm](https://www.jetbrains.com/webstorm/download/)
      link ([download link](https://www.jetbrains.com/webstorm/download/))

#### Getting started.

- clone the repository this URL [GitHub link](https://github.com/FahdJamy/mazon-store)

  ##### Frontend.

- navigate / cd into the frontend directory `cd frontend`
- install the frontend dependencies by running the command `npm install` or `yarn`

    #### Available Scripts

    In the project directory, you can run:

- `yarn start`: Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser. The page will reload if you make edits.\
You will also see any lint errors in the console.
- `yarn test`: Launches the test runner in the interactive watch mode.
- `yarn build`: Builds the app for production to the `build` folder. It correctly bundles React in production mode and optimizes the build for the best performance. The build is minified and the filenames include the hashes.\

**Running the frontend with docker-compose.**

_**NOTE: please make sure you have docker-compose version that supports version 3.7 installed on your machine.**_

- make sure you are in the `/frontend` directory
- run docker-compose --build up.
- to access the application, use the url [http://0.0.0.3000](http://0.0.0.3000)

----
**Note**
_To access the frontend url, use the format below_

`{{hosturl}}:3000/`

For example:
- after running the frontend, access the application using:
````
http://localhost:3000/
````

or click the link below:

[link](http://localhost:3000/)

-----

#### Notes about the front application.

- The application can only be accessed or used by three types of users.
    - `BUYER`
    - `SELLER`
    - `ADMIN`
- Only two types of users can register to the application **BUYER/SELLER** via the registration page: [link](http://localhost:3000/register).
- The **ADMIN** user type is created automatically with the credentials.
    - `password: admin`
    - `username: admin`
- Below are the open (non-auth-required) routes
    - login route: `{{hosturl}}:3000/register` [link](http://localhost:3000/register)
    - registration route: `{{hosturl}}:3000/register` [link](http://localhost:3000/register)
- All the other endpoints require a user to login first. 
- Users will be redirected automatically to their pages (dashboards) basing on their roles. _**all pages not authorized
    for them are blocked from their access**_.
