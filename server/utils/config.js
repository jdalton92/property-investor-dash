const MongoStore = require("connect-mongo");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

let FRONTEND_URL = "http://localhost:3000";
const SALT_ROUNDS = 10;
const ONE_WEEK = 7 * 24 * 60 * 60 * 1000; // 1 week in milliseconds
const PORT = process.env.PORT || 3001;
const MONGODB_URI = process.env.MONGODB_URI;
const V1_API = "/api/v1";
const MONGO_ID_REGEX = /^[a-f\d]{24}$/i;

const SESSION_CONFIG = {
  name: "sid",
  resave: false,
  saveUninitialized: false,
  secret: process.env.SESSION_SECRET,
  cookie: {
    maxAge: ONE_WEEK,
    sameSite: false,
  },
};

if (process.env.NODE_ENV === "production") {
  FRONTEND_URL = "https://propertyinvestordash.com";
  SESSION_CONFIG.store = MongoStore.create({
    mongoUrl: MONGODB_URI,
  });
  SESSION_CONFIG.cookie.sameSite = "none";
  SESSION_CONFIG.cookie.secure = true;
  SESSION_CONFIG.proxy = true;
}

module.exports = {
  MONGO_ID_REGEX,
  SESSION_CONFIG,
  SALT_ROUNDS,
  FRONTEND_URL,
  MONGODB_URI,
  PORT,
  V1_API,
};
