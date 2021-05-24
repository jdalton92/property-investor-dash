const bcrypt = require("bcryptjs");
const loginRouter = require("express").Router();
const User = require("../models/user");
const Token = require("../models/token");
const ValidationError = require("../utils/error");
const sendEmail = require("../utils/email");
const config = require("../utils/config");
const parsers = require("../utils/parsers");
const crypto = require("crypto");

loginRouter.post("/", async (request, response, next) => {
  try {
    const { email, password } = request.body;

    if (!email || !password) {
      return next(new ValidationError(400, "Provide both email and password"));
    }

    const user = await User.findOne({ email });
    const passwordCorrect =
      user === null ? false : await bcrypt.compare(password, user.passwordHash);

    if (!(user && passwordCorrect)) {
      return next(new ValidationError(400, "Invalid email or password"));
    }

    const userResponse = parsers.userTokenParser(user);

    return response.status(200).send(userResponse);
  } catch (e) {
    next(e);
  }
});

loginRouter.post("/demo", async (request, response, next) => {
  try {
    const demoUser = await User.findOne({ email: process.env.DEMO_USER_EMAIL });

    if (!demoUser) {
      return next(new ValidationError(404, "Demo user not found"));
    }

    const userResponse = parsers.userTokenParser(demoUser);
    userResponse.userData.messagesRead = []; // Show all messages for demo user

    return response.status(200).send(userResponse);
  } catch (e) {
    next(e);
  }
});

loginRouter.post("/reset-password", async (request, response, next) => {
  try {
    const { email } = request.body;

    if (!email) {
      return next(new ValidationError(400, "Please provide email"));
    }

    const user = await User.findOne({ email });
    if (!user) {
      return next(
        new ValidationError(400, "User with this email does not exist")
      );
    }

    const token = await Token.findOne({ user: user._id });
    if (token) {
      await token.deleteOne();
    }

    const saltRounds = 10;
    const resetToken = crypto.randomBytes(32).toString("hex");
    const tokenHash = await bcrypt.hash(resetToken, saltRounds);

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

    return response
      .status(200)
      .send({ message: `An email has been sent to ${email}` });
  } catch (e) {
    next(e);
  }
});

module.exports = loginRouter;
