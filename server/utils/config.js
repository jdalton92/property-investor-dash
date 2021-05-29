const MongoStore = require("connect-mongo");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const SESSION_CONFIG = {
  name: "sid",
  resave: false,
  saveUninitialized: false,
  secret: process.env.SESSION_SECRET,
  proxy: undefined, // Inherit from express
  cookie: {
    maxAge: 2 * 60 * 60 * 1000, // 2 hours in milliseconds
    sameSite: true,
    secure: process.env.NODE_ENV === "production",
  },
};

let FRONTEND_URL = process.env.TEST_FRONTEND_URL;
const SALT_ROUNDS = 10;
const PORT = process.env.PORT || 3001;
const MONGODB_URI = process.env.MONGODB_URI;
const V1_API = "/api/v1";
const ID_REGEX = /^[a-f\d]{24}$/i;

if (process.env.NODE_ENV === "production") {
  FRONTEND_URL = process.env.FRONTEND_URL;
  SESSION_CONFIG.store = MongoStore.create({
    mongoUrl: MONGODB_URI,
  });
  SESSION_CONFIG.cookie.secure = true;
}

module.exports = {
  ID_REGEX,
  SESSION_CONFIG,
  SALT_ROUNDS,
  FRONTEND_URL,
  MONGODB_URI,
  PORT,
  V1_API,
};
