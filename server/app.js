const config = require("./utils/config");
const express = require("express");
const path = require("path");
const app = express();
const cors = require("cors");
const logger = require("./utils/logger");
const mongoose = require("mongoose");
mongoose.set("useCreateIndex", true);

const middleware = require("./utils/middleware");

const loginRouter = require("./controllers/login");
const dashboardsRouter = require("./controllers/dashboards");
const cashflowRouter = require("./controllers/cashflow");
const usersRouter = require("./controllers/users");
const emailRouter = require("./controllers/email");

app.use(cors());
app.use(express.static("build"));
app.use(express.json());

const databaseConnection = async () => {
  try {
    logger.info("connecting to", config.MONGODB_URI);
    await mongoose.connect(config.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    logger.info("connected to MongoDB");
  } catch (e) {
    logger.error("error connection to MongoDB:", e.message);
  }
};
if (process.env.NODE_ENV !== "test") {
  databaseConnection();
}

app.use(middleware.requestLogger);
app.use(middleware.tokenExtractor);

app.use("/api/login", loginRouter);
app.use("/api/dashboards", dashboardsRouter);
app.use("/api/cashflow", cashflowRouter);
app.use("/api/users", usersRouter);
app.use("/api/email", emailRouter);
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "build", "index.html"));
});

app.use(middleware.errorHandler);

module.exports = app;
