# **PropertyInvestorDash**

Simple open source tool for calculating your return for property investments

![screenshot](https://i.imgur.com/nJQBojs.png)

## Prototype

> [https://propertyinvestordash.com/](https://propertyinvestordash.com/)

## Authors

- **James Dalton**

## Calculator Types

- **Owner-Occupier:** buy, live, sell
- **Investor:** buy, rent, sell
- **Developer:** buy, build/renovate, rent, sell

## Instructions

1. Clone app, install dependencies, and run the frontend locally

```sh
$ git clone https://github.com/jdalton92/property-investor-dash.git
$ cd client
$ npm install
$ npm start
```

2. Run the backend locally

Create `.env` file in backend root directory with environment variables for the following uses;

- **requests:** PORT
- **MongoDB:** MONGODB_URI
- **jwt:** SECRET
- **Mailgun:** API_KEY, DOMAIN, EMAIL

Example `.env` file in the `server` directory:

```sh
MONGODB_URI=mongodb+srv://<username>:<id>@<url>.mongodb.net/<collection-name>
PORT=3001
SESSION_SECRET=<session_secret>
ACCESS_TOKEN_SECRET=<access_token_secret>
REFRESH_TOKEN_SECRET=<refresh_token_secret>
EMAIL=<your_email>
API_KEY=<your_mailgun_api_key>
DOMAIN=<your_mailgun_domain>
DEMO_USER_EMAIL=demo@email.com
TEST_USER_EMAIL=test@email.com
TEST_USER_PASSWORD=test
FRONTEND_URL=https://propertyinvestordash.com
TEST_FRONTEND_URL=http://localhost:3000
```

Then navidate to the server directory and install dependencies, and run the backend with `nodemon`

```sh
$ cd server
$ npm install
$ npm run watch
```

## Testing

Testing occurs locally using an in-memory mongo database. Optionally, include `--silent` to supress the console when testing.

```sh
npm test
```

**Optionally:** specify a file with `-f` and a test with `-t` eg. to test `server/tests/routes/dashboards.route.test.js` file and the `GET /` test, use the following command

```sh
npm test -f "tests/routes/dashboards.route.test" -t "GET /"
```

## Built with

- [create-react-app](https://github.com/facebook/create-react-app) - Create React App is a comfortable environment for learning React, and is the best way to start building a new single-page application in React.
- [ReactJS](https://reactjs.org/) - A JavaScript library for building user interfaces
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) - Database built for agile teams who’d rather spend time building apps than managing databases.
- [NodeJS](https://nodejs.org/en/) - Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine
- [Visual Studio Code](https://code.visualstudio.com/) - IDE

## Licence

This project is licensed under the terms of the MIT license
