const jwt = require("jsonwebtoken");
const middleware = require("../utils/middleware");
const bcrypt = require("bcryptjs");
const usersRouter = require("express").Router();
const User = require("../models/user");
const ValidationError = require("../utils/error");
const parsers = require("../utils/parsers");

usersRouter.post("/", async (request, response, next) => {
  try {
    const { password, email, checkPassword } = request.body;

    if (!email) {
      return next(new ValidationError(400, "Email required"));
    }

    const existingUser = await User.find({ email: email });

    if (existingUser.length > 0) {
      return next(new ValidationError(400, "Email in use"));
    }

    if (password !== checkPassword) {
      return next(new ValidationError(400, "Passwords must match"));
    }

    if (!password || password.length < 3) {
      return next(new ValidationError(400, "Pasword minimum length 3"));
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);
    const user = new User({ email, passwordHash });
    const savedUser = await user.save();
    const userInfo = parsers.userTokenParser(savedUser);

    return response.status(201).json(userInfo);
  } catch (e) {
    next(e);
  }
});

usersRouter.put(
  "/:id",
  middleware.tokenValidate,
  async (request, response, next) => {
    try {
      const userData = request.body;
      let updatedUserData = {};

      const user = await User.findById(request.params.id);
      if (!user) {
        return next(new ValidationError(400, "Invalid user id"));
      }
      if (user.roles.includes("demo")) {
        return next(
          new ValidationError(403, "Unauthorised to update demo user")
        );
      }

      // Update Email
      let token;
      if (userData.newEmail) {
        const existingEmail = await User.find({ email: userData.newEmail });

        if (existingEmail.length > 0) {
          return next(new ValidationError(400, "Email already in use"));
        }

        const userForToken = {
          email: userData.newEmail,
          id: user._id,
        };

        token = jwt.sign(userForToken, process.env.SECRET);

        updatedUserData.email = userData.newEmail;
      }

      // Update Password
      if (
        userData.oldPassword &&
        (!userData.newPassword || userData.newPassword.length < 3)
      ) {
        return next(new ValidationError(400, "Pasword minimum length 3"));
      }

      if (userData.newPassword) {
        if (!userData.oldPassword) {
          return next(new ValidationError(400, "Old password is required"));
        }

        if (userData.newPassword !== userData.checkPassword) {
          return next(new ValidationError(400, "New passwords must match"));
        }

        const passwordCorrect =
          user === null
            ? false
            : await bcrypt.compare(userData.oldPassword, user.passwordHash);

        if (!passwordCorrect) {
          return next(new ValidationError(401, "Invalid password"));
        }

        const saltRounds = 10;
        updatedUserData.passwordHash = await bcrypt.hash(
          userData.newPassword,
          saltRounds
        );
      }

      // Messages read
      if (userData.messagesRead) {
        updatedUserData.messagesRead = user.messagesRead;
        userData.messagesRead.forEach((message) => {
          if (user.messagesRead.indexOf(message) === -1) {
            updatedUserData.messagesRead.push(message);
          }
        });
      }

      const updatedUser = await User.findByIdAndUpdate(
        request.params.id,
        updatedUserData,
        { new: true }
      );

      const userInfo = parsers.userTokenParser(updatedUser);

      return response.status(200).send(userInfo);
    } catch (e) {
      next(e);
    }
  }
);

usersRouter.delete(
  "/:id",
  middleware.tokenValidate,
  async (request, response, next) => {
    try {
      const { password } = request.body;

      const user = await User.findById(request.params.id);
      const passwordCorrect =
        user === null
          ? false
          : await bcrypt.compare(password, user.passwordHash);

      if (user && passwordCorrect) {
        await User.findByIdAndDelete(request.params.id);
        response.status(204).end();
      } else {
        return next(new ValidationError(401, "Invalid user or password"));
      }
    } catch (e) {
      next(e);
    }
  }
);

module.exports = usersRouter;
