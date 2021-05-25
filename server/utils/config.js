if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

let SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS, 10);
let PORT = process.env.PORT || 3001;
let MONGODB_URI = process.env.MONGODB_URI;
let FRONTEND_URL = process.env.FRONTEND_URL;

if (process.env.NODE_ENV !== "production") {
  SALT_ROUNDS = parseInt(process.env.TEST_SALT_ROUNDS);
  PORT = process.env.TEST_PORT;
  MONGODB_URI = process.env.TEST_MONGODB_URI;
  FRONTEND_URL = process.env.TEST_FRONTEND_URL;
}

module.exports = {
  SALT_ROUNDS,
  FRONTEND_URL,
  MONGODB_URI,
  PORT,
};
