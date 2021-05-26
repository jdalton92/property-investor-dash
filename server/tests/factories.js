const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const User = require("../models/user.model");
const Token = require("../models/token.model");
const { getUserAndToken } = require("../utils/parsers");
const config = require("../utils/config");

const getTestUserAndToken = async (email, password) => {
  const passwordHash = await bcrypt.hash(
    password || process.env.TEST_USER_PASSWORD,
    config.SALT_ROUNDS
  );

  const user = new User({
    email: email || process.env.TEST_USER_EMAIL,
    passwordHash,
    hasAcceptedTCs: true,
  });
  await user.save();

  return getUserAndToken(user);
};

const getPasswordResetToken = async (userId) => {
  await Token.find({ user: userId }).deleteMany();

  const resetToken = crypto.randomBytes(32).toString("hex");
  const tokenHash = await bcrypt.hash(resetToken, config.SALT_ROUNDS);

  await new Token({ user: userId, tokenHash }).save();

  return resetToken;
};

module.exports = { getTestUserAndToken, getPasswordResetToken };
