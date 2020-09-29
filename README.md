# **PropertyInvestor**DASH

Simple open source tool for calculating your return for property investments

[INSERT IMAGE](https://propertyinvestordash.com/)

## Prototype

> [https://propertyinvestordash.com/](https://propertyinvestordash.com/)

## Authors

- **James Dalton**

## Calculator Types

- **Owner-Occupier:** buy, live, sell
- **Investor:** buy, rent, sell
- **Developer:** buy, build/renovate, rent, sell

## Instructions

1. Clone app, and run frontend

```sh
git clone https://github.com/jdalton92/property-investor-dash.git
cd client
npm install
npm start
```

2. **Optional:** Integrate Backend to allow user creation, login, save dashboard, and contact form.

Create `.env` file in backend root directory with environment variables for the following uses;

- **MongoDB:** MONGODB_URI, PORT
- **jwt:** SECRET
- **Mailgun:** API_KEY, DOMAIN, EMAIL

```sh
cd server
npm install
npm run watch
```

## Built with

- [create-react-app](https://github.com/facebook/create-react-app) - Create React App is a comfortable environment for learning React, and is the best way to start building a new single-page application in React.
- [ReactJS](https://reactjs.org/) - A JavaScript library for building user interfaces
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) - Database built for agile teams who’d rather spend time building apps than managing databases.
- [NodeJS](https://nodejs.org/en/) - Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine
- [Visual Studio Code](https://code.visualstudio.com/) - IDE

## Licence

This project is licensed under the terms of the MIT license
