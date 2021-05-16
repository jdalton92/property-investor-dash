const mongoose = require("mongoose");
// const bcrypt = require("bcryptjs");
const { MongoMemoryServer } = require("mongodb-memory-server");

const parsers = require("../utils/parsers");
const User = require("../models/user");

const mongod = new MongoMemoryServer();

module.exports.connectAndCreateUser = async () => {
  // Before establishing a new connection close previous
  await mongoose.disconnect();

  const uri = await mongod.getUri();

  const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
  };

  await mongoose.connect(uri, options, (err) => {
    if (err) {
      console.error(err);
    }
  });

  const testUser = new User({
    email: process.env.TEST_USER_EMAIL,
    passwordHash: process.env.TEST_USER_PASSWORD, // Plain text just for testing
    hasAcceptedTCs: true,
  });
  await testUser.save();

  const userInfo = parsers.userTokenParser(testUser);

  return userInfo.token;
};

module.exports.closeDatabase = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongod.stop();
};

module.exports.clearDatabase = async () => {
  const collections = mongoose.connection.collections;

  for (const key in collections) {
    await collections[key].deleteMany();
  }
};
