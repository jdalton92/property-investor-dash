const bcrypt = require("bcryptjs");
const User = require("../models/user.model");
const config = require("../utils/config");
const { getUserAndToken } = require("../utils/parsers");

const createUser = async (password, email, checkPassword, hasAcceptedTCs) => {
  if (!email) {
    throw new Error("Email required", 400);
    // return next(new ValidationError(400, "Email required"));
  }

  if (!hasAcceptedTCs) {
    throw new Error("Must accept terms and conditions", 400);
    // return next(new ValidationError(400, "Must accept terms and conditions"));
  }

  const existingUser = await User.find({ email: email });

  if (existingUser.length > 0) {
    throw new Error("Email in use", 400);
    // return next(new ValidationError(400, "Email in use"));
  }

  if (password !== checkPassword) {
    throw new Error("Passwords must match", 400);
    // return next(new ValidationError(400, "Passwords must match"));
  }

  if (!password || password.length < 3) {
    throw new Error("Pasword minimum length 3", 400);
    // return next(new ValidationError(400, "Pasword minimum length 3"));
  }

  const passwordHash = await bcrypt.hash(password, config.SALT_ROUNDS);
  const user = new User({ email, passwordHash, hasAcceptedTCs });
  const savedUser = await user.save();
  const userResponse = getUserAndToken(savedUser);

  return userResponse;
};

const updateUser = async (userId, userData) => {
  let updatedUserData = {};

  const user = await User.findById(userId);
  if (!user) {
    throw new Error("Invalid user id", 404);
    // return next(new ValidationError(400, "Invalid user id"));
  }

  // Update Email
  if (userData.newEmail) {
    const existingEmail = await User.find({ email: userData.newEmail });
    if (existingEmail.length > 0) {
      throw new Error("Email already in use", 404);
      //   return next(new ValidationError(400, "Email already in use"));
    }
    updatedUserData.email = userData.newEmail;
  }

  // Update Password
  if (
    userData.oldPassword &&
    (!userData.newPassword || userData.newPassword.length < 3)
  ) {
    throw new Error("Pasword minimum length 3", 400);
    // return next(new ValidationError(400, "Pasword minimum length 3"));
  }

  if (userData.newPassword) {
    if (!userData.oldPassword) {
      throw new Error("Old password is required", 400);
      //   return next(new ValidationError(400, "Old password is required"));
    }

    if (userData.newPassword !== userData.checkPassword) {
      throw new Error("New passwords must match", 400);
      //   return next(new ValidationError(400, "New passwords must match"));
    }

    const passwordCorrect =
      user === null
        ? false
        : await bcrypt.compare(userData.oldPassword, user.passwordHash);

    if (!passwordCorrect) {
      throw new Error("Invalid password", 401);
      //   return next(new ValidationError(401, "Invalid password"));
    }

    updatedUserData.passwordHash = await bcrypt.hash(
      userData.newPassword,
      config.SALT_ROUNDS
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

  const updatedUser = await User.findByIdAndUpdate(userId, updatedUserData, {
    new: true,
  });

  return getUserAndToken(updatedUser);
};

const deleteUser = async (userId, password) => {
  const user = await User.findById(userId);
  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.passwordHash);

  if (user && passwordCorrect) {
    await User.findByIdAndDelete(userId);
  } else {
    throw new Error("Invalid user or password", 401);
    // return next(new ValidationError(401, "Invalid user or password"));
  }
};

module.exports = { createUser, updateUser, deleteUser };
