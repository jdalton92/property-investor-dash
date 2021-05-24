const auth = require("../auth/authMiddleware");
const bcrypt = require("bcryptjs");
const usersRouter = require("express").Router();
const User = require("../models/user");
const Token = require("../models/token");
const ValidationError = require("../utils/error");
const parsers = require("../utils/parsers");

usersRouter.post("/", async (request, response, next) => {
  try {
    const { password, email, checkPassword, hasAcceptedTCs } = request.body;

    if (!email) {
      return next(new ValidationError(400, "Email required"));
    }

    if (!hasAcceptedTCs) {
      return next(new ValidationError(400, "Must accept terms and conditions"));
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
    const user = new User({ email, passwordHash, hasAcceptedTCs });
    const savedUser = await user.save();
    const userResponse = parsers.userTokenParser(savedUser);

    return response.status(201).json(userResponse);
  } catch (e) {
    next(e);
  }
});

usersRouter.put(
  "/:id",
  auth.isAuthenticated,
  auth.isAdminOrUserOwner,
  async (request, response, next) => {
    try {
      const userData = request.body;
      let updatedUserData = {};

      const user = await User.findById(request.params.id);
      if (!user) {
        return next(new ValidationError(400, "Invalid user id"));
      }
      if (user.roles.includes("demo")) {
        return next(new ValidationError(403, "Demo user can not be updated"));
      }

      // Update Email
      if (userData.newEmail) {
        const existingEmail = await User.find({ email: userData.newEmail });

        if (existingEmail.length > 0) {
          return next(new ValidationError(400, "Email already in use"));
        }

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

      const userResponse = parsers.userTokenParser(updatedUser);

      return response.status(200).send(userResponse);
    } catch (e) {
      next(e);
    }
  }
);

usersRouter.post("/reset-password", async (request, response, next) => {
  try {
    const { id, token, password, checkPassword } = request.body;

    if (!password || !checkPassword) {
      return next(
        new ValidationError(
          400,
          "Password and confirmation password are required"
        )
      );
    }

    if (password !== checkPassword) {
      return next(new ValidationError(400, "New passwords must match"));
    }

    if (password.length < 3) {
      return next(new ValidationError(400, "Pasword minimum length 3"));
    }

    const passwordResetToken = await Token.findOne({ user: id });

    if (!passwordResetToken) {
      return next(
        new ValidationError(
          400,
          "Invalid or expired password reset token. Please generate a new link"
        )
      );
    }

    const tokenCorrect = await bcrypt.compare(
      token,
      passwordResetToken.tokenHash
    );
    if (!tokenCorrect) {
      return next(
        new ValidationError(
          400,
          "Invalid or expired password reset token. Please generate a new link"
        )
      );
    }
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);
    const user = await User.findByIdAndUpdate(
      id,
      { passwordHash },
      { new: true }
    );

    await passwordResetToken.deleteOne();

    const userResponse = parsers.userTokenParser(user);

    return response.status(200).send(userResponse);
  } catch (e) {
    next(e);
  }
});

usersRouter.delete(
  "/:id",
  auth.isAuthenticated,
  auth.isAdminOrUserOwner,
  async (request, response, next) => {
    try {
      const { password } = request.body;

      const user = await User.findById(request.params.id);
      if (user.roles.includes("demo")) {
        return next(new ValidationError(403, "Demo user can not be deleted"));
      }
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
