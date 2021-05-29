const express = require("express");
const session = require("express-session");
const path = require("path");
const app = express();
const cors = require("cors");
const config = require("./utils/config");
const { connectDatabase } = require("./utils/database");

const { V1_API } = require("./utils/config");
const authMiddleware = require("./utils/authMiddleware");
const middleware = require("./utils/middleware");
const v1Routes = require("./routes/index.route");

app.use(cors({ credentials: true, origin: config.FRONTEND_URL }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("build"));
app.use(express.json());
app.use(session(config.SESSION_CONFIG));

if (process.env.NODE_ENV === "production") {
  app.enable("trust proxy");
}
if (process.env.NODE_ENV !== "test") {
  connectDatabase();
}

app.use(authMiddleware.configHeaders);
app.use(middleware.requestLogger);

app.use(V1_API, v1Routes);
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "build", "index.html"));
});

app.use(middleware.errorHandler);

module.exports = app;
