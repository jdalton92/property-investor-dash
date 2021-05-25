const bcrypt = require("bcryptjs");
const User = require("../models/user.model");
const { getUserAndToken } = require("../utils/parsers");
const config = require("../utils/config");

module.exports.getTestUserToken = async () => {
  const passwordHash = await bcrypt.hash(
    process.env.TEST_USER_PASSWORD,
    config.SALT_ROUNDS
  );

  const testUser = new User({
    email: process.env.TEST_USER_EMAIL,
    passwordHash,
    hasAcceptedTCs: true,
  });
  await testUser.save();

  const userResponse = getUserAndToken(testUser);

  return userResponse.token;
};
