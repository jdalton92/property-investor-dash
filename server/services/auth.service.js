const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const User = require("../models/user.model");
const Token = require("../models/token.model");
const Exception = require("../utils/error");
const sendEmail = require("../utils/email");
const { serializeUser } = require("../utils/user");
const config = require("../utils/config");

const loginUser = async (email, password) => {
  if (!email || !password) {
    throw new Exception(400, "Provide both email and password");
  }

  const user = await User.findOne({ email });
  const passwordCorrect = user && (await user.validatePassword(password));

  if (!passwordCorrect) {
    throw new Exception(400, "Invalid email or password");
  }

  return serializeUser(user);
};

const demoUser = async () => {
  const demoUser = await User.findOne({ email: process.env.DEMO_USER_EMAIL });

  if (!demoUser) {
    throw new Exception(404, "Demo user not found");
  }

  const user = serializeUser(demoUser);
  user.messagesRead = []; // Show all messages for demo user

  return user;
};

const requestPasswordReset = async (email) => {
  if (!email) {
    throw new Exception(400, "Please provide email");
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new Exception(404, "User not found");
  }

  await Token.findOneAndDelete({ user: user._id });

  const resetToken = crypto.randomBytes(32).toString("hex");

  // Token hashing handled in pre save hook
  await new Token({
    user: user._id,
    tokenHash: resetToken,
  }).save();

  const baseUrl = `${config.FRONTEND_URL}`;
  const route = `/new-password?token=${resetToken}&id=${user._id}`;

  await sendEmail(
    `"PropertyInvestorDash" <noreply@propertyinvestordash.com>`,
    email,
    "Password Reset",
    "./templates/reset-password.handlebars",
    { baseUrl, route }
  );
};

const resetPassword = async (id, token, password, checkPassword) => {
  if (!password || !checkPassword) {
    throw new Exception(400, "Password and confirmation password are required");
  }

  if (password !== checkPassword) {
    throw new Exception(400, "New passwords must match");
  }

  if (password.length < 3) {
    throw new Exception(400, "Pasword minimum length 3");
  }

  const passwordResetToken = await Token.findOne({ user: id });

  if (!passwordResetToken) {
    throw new Exception(
      400,
      "Invalid or expired password reset token. Please generate a new link"
    );
  }

  const tokenCorrect = await passwordResetToken.validateToken(token);
  if (!tokenCorrect) {
    throw new Exception(
      400,
      "Invalid or expired password reset token. Please generate a new link"
    );
  }
  const passwordHash = await bcrypt.hash(password, config.SALT_ROUNDS);
  const user = await User.findByIdAndUpdate(
    id,
    { passwordHash },
    { new: true }
  );

  await passwordResetToken.deleteOne();

  return serializeUser(user);
};

module.exports = {
  loginUser,
  demoUser,
  requestPasswordReset,
  resetPassword,
};
