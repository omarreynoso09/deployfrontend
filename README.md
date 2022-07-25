# _Fullstack Deploy_

## Goals

- Deploy a fullstack (MERNstack) web application to a public url.
- Get practice working collaboratively on projects by splitting up the deployment and implementation of features between two students, one working on the front-end and one working on the back-end.

## Resources

- Deploying with Heroku
  - https://devcenter.heroku.com/articles/git

## Approach

- Students will be divided into teams of two. Each team will select one person to deploy the server and one person to deploy the client.
- Both the client and server applications will be deployed using heroku.
- Students will implement features in tandem with one another in two ways:
  - Day 1 will be student A working on the front end, while student B works on the backend with the goal of connecting the client to the server via REST API.
  - Day 2 will be student A implementing feature 1 on both the front-end and backend, while student B implements feature 2 on both the front-end and backend.
  - This approach is to give students exposure to code collaboration tools such as git, pull requests, and hosted applications.

### Requirements (Student A - Part 1: Client Setup)

- Create a new github repo called deployfrontend, clone the repo to your computer and add the link to populi.
- Initialize the repo with create-react-app.
  - npx create-react-app .
- Install react-router
  - npm i react-router-dom@6
- Add a new env file ./.env.local and add the following environment variable to it:
  - REACT_APP_URL_ENDPOINT = http://localhost:4000
  - Note: This will be the endpoint for developing locally on your computer. When we deploy the client, we will change this environment variable to be the url of the server deployed by Student B. Thus, your deployed client will be able to make requests to the deployed server.
- Configure react-router by adding <BrowserRouter> to index.js.
  - import { BrowserRouter } from "react-router-dom";
  - root.render(
    <React.StrictMode>
    <BrowserRouter>
    <App />
    </BrowserRouter>
    </React.StrictMode>
    );
- Create a new folder ./src/Pages
- Create a new file ./src/Pages/HomePage.js with a default exported react component <HomePage />
- In <App>, implement the following:
  - Add this import statement:
    - import { Routes, Route } from "react-router-dom";
  - Add the routes elements to the JSX
    - <Routes></Routes>
  - A new index route with the element <HomePage />
    - <Route index element={<HomePage />} />
  - Add a two new state variables, clientMessage and serverMessage
  - Pass clientMessage, setClientMessage, and serverMessage as props into <HomePage />
  - Add a new function called sendReceiveMessage to the body of <App />, it should:
    - Send a POST request to `${urlEndpoint}/post-message`
    - The body of the request should be a JSON stringified object containing clientMessage:
      - JSON.stringify({clientMessage})
    - After invoking the POST request, await a response from the server
    - Once the response is received, set serverMessage to the received message:
      - setServerMessage(responseJSON.serverMessage)
- In <HomePage />, implement the following:
  - Display clientMessage and serverMessage
  - Add a text input field that sets clientMessage to the following:
    - const dateTime = new Date()
    - `Message: ${e.target.value} at time ${dateTime.toString()}`
  - Add a button called Send that calls the sendReceiveMessage function from props

### Requirements (Student B - Part 1: Server Setup)

- Create a new github repo called deploybackend, clone the repo to your computer and add the link to populi. Note: when you create this repository, you must add a README, and a node .gitignore template.
- Initialize the repo with express-generator.
  - npx express-generator .
- Create a new file ./.env and add the following environment variable to it
  - PORT=4000
    - Note: This will change the server port to 4000 on startup
- [Optional] Install nodemon on the server and add the custom dev command in the package.json
  - npm i nodemon
  - "scripts": {
    "start": "node ./bin/www",
    "dev": "nodemon ./bin/www"
    }
- Install the CORS package by running "npm i cors" in ./
  - npm i cors
- Add the followng code, after the line var app = express();, to app.js:
  - //enable cors
    const cors = require("cors");
    app.use(cors());
    app.options("\*", cors());
- In routes/index.js, implement the following:
  - Add a new POST route "/post-message" and implement the following:
    - Note: This route will recieve a POST request from the client Student A is building. The post body should be of the shape {clientMessage: "Some string message"}.
    - The POST route should get the clientMessage from the req.body and respond with:
      - const dateTime = new Date()
        `Received client message: ${clientMessage}. Responded at ${dateTime.toString()}`

### Requirements (Students A and B - Part 2: Configure Heroku and Deploy)

- Note: Here is the dev guide for deployment for reference
  - https://devcenter.heroku.com/articles/git
- Create an account on Heroku
- https://www.heroku.com/
- In your local repository, commit all changes and push to origin
- For Student B:
  - Create a new Heroku remote host for the server:
    - heroku create -a deploybackend
  - Deploy your server code:
    - git push heroku main
  - If everything worked, Student B should now have a Heroku url for the hosted server. Send that url to Student A.
- For Student A:
  - Create a new Heroku remote host for the client:
    - heroku create -a deployfrontend
  - Add the url Student B sent you as a new environment variable in the Heroku dashboard for your application.
    - Log in to https://dashboard.heroku.com/
    - Click on the app that you've deployed
    - Go to Settings
    - Click Reveal Config Vars
    - Add the new environment variable as a new config var
  - Deploy your client code:
    - git push heroku main
- If everything has been set up correctly, you should be able to type a message on the client home page, press the Send button, and see the server response message with two date timestamps.
