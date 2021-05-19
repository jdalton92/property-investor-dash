const parsers = require("../utils/parsers");
const bcrypt = require("bcryptjs");
const User = require("../models/user");

module.exports.getTestUserToken = async () => {
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(
    process.env.TEST_USER_PASSWORD,
    saltRounds
  );

  const testUser = new User({
    email: process.env.TEST_USER_EMAIL,
    passwordHash,
    hasAcceptedTCs: true,
  });
  await testUser.save();

  const userResponse = parsers.userTokenParser(testUser);

  return userResponse.token;
};
