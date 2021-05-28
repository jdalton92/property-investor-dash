const express = require("express");
const path = require("path");
const app = express();
const cors = require("cors");
const { connectDatabase } = require("./utils/database");

const { V1_API } = require("./utils/config");
const middleware = require("./utils/middleware");
const mainRouter = require("./routes/index.route");

app.use(cors());
app.use(express.static("build"));
app.use(express.json());

if (process.env.NODE_ENV !== "test") {
  connectDatabase();
}

app.use(middleware.requestLogger);
app.use(middleware.tokenExtractor);
app.use(middleware.userExtractor);

app.use(V1_API, mainRouter);
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "build", "index.html"));
});

app.use(middleware.errorHandler);

module.exports = app;
