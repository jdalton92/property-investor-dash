const express = require("express");
const session = require("express-session");
const path = require("path");
const app = express();
const cors = require("cors");
const config = require("./utils/config");
const { connectDatabase } = require("./utils/database");

const { V1_API } = require("./utils/config");
const middleware = require("./utils/middleware");
const mainRouter = require("./routes/index.route");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("build"));
app.use(express.json());
app.use(session(config.SESSION_CONFIG));

if (process.env.NODE_ENV === "production") {
  app.enable("trust proxy"); // Allow secure cookies
}
if (process.env.NODE_ENV !== "test") {
  connectDatabase();
}

app.use(middleware.requestLogger);

app.use(V1_API, mainRouter);
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "build", "index.html"));
});

app.use(middleware.errorHandler);

module.exports = app;
