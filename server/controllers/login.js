const bcrypt = require("bcryptjs");
const loginRouter = require("express").Router();
const User = require("../models/user");
const ValidationError = require("../utils/error");
const parsers = require("../utils/parsers");

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

    const userResponse = parsers.userTokenParser(demoUser);
    userResponse.userData.messagesRead = []; // Show all messages for demo user

    return response.status(200).send(userInfo);
  } catch (e) {
    next(e);
  }
});

module.exports = loginRouter;
