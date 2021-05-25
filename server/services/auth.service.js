const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const User = require("../models/user.model");
const Token = require("../models/token.model");
const sendEmail = require("../utils/email");
const { getUserAndToken } = require("../utils/parsers");
const config = require("../utils/config");

const loginUser = async (email, password) => {
  if (!email || !password) {
    throw new Error("Provide both email and password", 400);
  }

  const user = await User.findOne({ email });
  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.passwordHash);

  if (!(user && passwordCorrect)) {
    throw new Error("Invalid email or password", 400);
    // return next(new ValidationError(400, "Invalid email or password"));
  }

  return getUserAndToken(user);
};

const demoUser = async () => {
  const demoUser = await User.findOne({ email: process.env.DEMO_USER_EMAIL });

  if (!demoUser) {
    throw new Error("Demo user not found", 404);
    // return next(new ValidationError(404, "Demo user not found"));
  }

  const userResponse = getUserAndToken(demoUser);
  userResponse.userData.messagesRead = []; // Show all messages for demo user

  return userResponse;
};

const requestPasswordReset = async (email) => {
  if (!email) {
    throw new Error("Please provide email", 404);
  }

  const user = await User.findOne({ email });
  // Fail silently if user is not found
  if (user) {
    await Token.findOneAndDelete({ user: user._id });

    const resetToken = crypto.randomBytes(32).toString("hex");
    const tokenHash = await bcrypt.hash(resetToken, config.SALT_ROUNDS);

    await new Token({
      user: user._id,
      tokenHash,
    }).save();

    const baseUrl = `${config.FRONTEND_URL}`;
    const route = `/reset-password/new-password?token=${resetToken}&id=${user._id}`;

    await sendEmail(
      `"PropertyInvestorDash" <noreply@propertyinvestordash.com>`,
      email,
      "Password Reset",
      "./templates/reset-password.handlebars",
      { baseUrl, route }
    );
  }
};

const resetPassword = async (id, token, password, checkPassword) => {
  if (!password || !checkPassword) {
    throw new Error("Password and confirmation password are required", 400);
    // return next(
    //   new ValidationError(
    //     400,
    //     "Password and confirmation password are required"
    //   )
    // );
  }

  if (password !== checkPassword) {
    throw new Error("New passwords must match", 400);
    // return next(new ValidationError(400, "New passwords must match"));
  }

  if (password.length < 3) {
    throw new Error("Pasword minimum length 3", 400);
    // return next(new ValidationError(400, "Pasword minimum length 3"));
  }

  const passwordResetToken = await Token.findOne({ user: id });

  if (!passwordResetToken) {
    throw new Error(
      "Invalid or expired password reset token. Please generate a new link",
      400
    );
    // return next(
    //   new ValidationError(
    //     400,
    //     "Invalid or expired password reset token. Please generate a new link"
    //   )
    // );
  }

  const tokenCorrect = await bcrypt.compare(
    token,
    passwordResetToken.tokenHash
  );
  if (!tokenCorrect) {
    throw new Error(
      "Invalid or expired password reset token. Please generate a new link",
      400
    );
    // return next(
    //   new ValidationError(
    //     400,
    //     "Invalid or expired password reset token. Please generate a new link"
    //   )
    // );
  }
  const passwordHash = await bcrypt.hash(password, config.SALT_ROUNDS);
  const user = await User.findByIdAndUpdate(
    id,
    { passwordHash },
    { new: true }
  );

  await passwordResetToken.deleteOne();

  return getUserAndToken(user);
};

module.exports = {
  loginUser,
  demoUser,
  requestPasswordReset,
  resetPassword,
};
