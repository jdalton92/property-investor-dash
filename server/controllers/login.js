const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const loginRouter = require("express").Router();
const User = require("../models/user");
const ValidationError = require("../utils/error");

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

    const userForToken = {
      email: user.email,
      id: user._id,
    };

    const token = jwt.sign(userForToken, process.env.SECRET);

    return response.status(200).send({
      token,
      email: user.email,
      messagesRead: user.messagesRead,
      id: user._id,
    });
  } catch (e) {
    next(e);
  }
});

module.exports = loginRouter;
