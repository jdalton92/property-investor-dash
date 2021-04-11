# **PropertyInvestorDash**

Simple open source tool for calculating your return for property investments

// INSERT IMAGE

## Prototype

> [https://propertyinvestordash.com/](https://propertyinvestordash.com/)

## Authors

- **James Dalton**

## Calculator Types

- **Owner-Occupier:** buy, live, sell
- **Investor:** buy, rent, sell
- **Developer:** buy, build/renovate, rent, sell

## Instructions

1. Clone app, install dependencies, and run frontend

```sh
$ git clone https://github.com/jdalton92/property-investor-dash.git
$ cd client
$ npm install
$ npm start
```

2. **Optional:** Integrate Backend to allow user creation, login, save dashboard, and contact form.

Create `.env` file in backend root directory with environment variables for the following uses;

- **requests:** PORT
- **MongoDB:** MONGODB_URI
- **jwt:** SECRET
- **Mailgun:** API_KEY, DOMAIN, EMAIL

Example `.env` file:

```sh
MONGODB_URI=mongodb+srv://<username>:<id>@<url>.mongodb.net/<collection-name>
PORT=3001
SECRET=<your_secret_key>
EMAIL=<your_email>
API_KEY=<your_mailgun_api_key>
DOMAIN=<your_mailgun_domain>
```

Then navidate to the server directory and install dependencies, and run the backend with `nodemon`

```sh
$ cd server
$ npm install
$ npm run watch
```

## Testing

```sh
npm test
```

**Optionally:** specify a specific file to test with `-t` eg. to test `server/controllers/__tests__/dashboards.test.js` use the following command

```sh
npm test -t dashboards
```

## Built with

- [create-react-app](https://github.com/facebook/create-react-app) - Create React App is a comfortable environment for learning React, and is the best way to start building a new single-page application in React.
- [ReactJS](https://reactjs.org/) - A JavaScript library for building user interfaces
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) - Database built for agile teams who’d rather spend time building apps than managing databases.
- [NodeJS](https://nodejs.org/en/) - Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine
- [Visual Studio Code](https://code.visualstudio.com/) - IDE

## Licence

This project is licensed under the terms of the MIT license
