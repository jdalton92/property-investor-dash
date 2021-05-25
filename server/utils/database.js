const mongoose = require("mongoose");
const logger = require("./logger");
const config = require("./config");

mongoose.set("useCreateIndex", true);

const connectDatabase = async () => {
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

module.exports = { connectDatabase };
