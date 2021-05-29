const bcrypt = require("bcryptjs");
const Exception = require("../utils/error");
const User = require("../models/user.model");
const config = require("../utils/config");
const { serializeUser } = require("../utils/user");
const Dashboard = require("../models/dashboard.model");

const createUser = async (password, email, checkPassword, hasAcceptedTCs) => {
  if (!email) {
    throw new Exception(400, "Email required");
  }

  if (!hasAcceptedTCs) {
    throw new Exception(400, "Must accept terms and conditions");
  }

  const existingUser = await User.find({ email: email });

  if (existingUser.length > 0) {
    throw new Exception(400, "Email in use");
  }

  if (password !== checkPassword) {
    throw new Exception(400, "Passwords must match");
  }

  if (!password || password.length < 3) {
    throw new Exception(400, "Pasword minimum length 3");
  }

  // Password hashing handled in pre save hook
  const user = new User({ email, passwordHash: password, hasAcceptedTCs });
  const savedUser = await user.save();
  const userResponse = serializeUser(savedUser);

  return userResponse;
};

const updateUser = async (userId, userData) => {
  let updatedUserData = {};

  const user = await User.findById(userId);
  if (!user) {
    throw new Exception(404, "User not found");
  }

  // Update Email
  if (userData.newEmail) {
    const existingEmail = await User.find({ email: userData.newEmail });
    if (existingEmail.length > 0) {
      throw new Exception(400, "Email already in use");
    }
    updatedUserData.email = userData.newEmail;
  }

  // Update Password
  if (
    userData.oldPassword &&
    (!userData.newPassword || userData.newPassword.length < 3)
  ) {
    throw new Exception(400, "Pasword minimum length 3");
  }

  if (userData.newPassword) {
    if (!userData.oldPassword) {
      throw new Exception(400, "Old password is required");
    }

    if (userData.newPassword !== userData.checkPassword) {
      throw new Exception(400, "New passwords must match");
    }

    const passwordCorrect =
      user && (await user.validatePassword(userData.oldPassword));

    if (!passwordCorrect) {
      throw new Exception(401, "Incorrect password");
    }

    updatedUserData.passwordHash = await bcrypt.hash(
      userData.newPassword,
      config.SALT_ROUNDS
    );
  }

  // Messages read
  if (userData.messagesRead) {
    updatedUserData.$addToSet = { messagesRead: userData.messagesRead };
  }

  // T&CS
  if (userData.hasAcceptedTCs) {
    updatedUserData.hasAcceptedTCs = userData.hasAcceptedTCs;
  }

  const updatedUser = await User.findByIdAndUpdate(userId, updatedUserData, {
    new: true,
  });

  return serializeUser(updatedUser);
};

const deleteUser = async (userId, password) => {
  const user = await User.findById(userId);
  const passwordCorrect = user && (await user.validatePassword(password));

  if (passwordCorrect) {
    await User.findByIdAndDelete(userId);
    await Dashboard.deleteMany({ user: userId });
  } else {
    throw new Exception(401, "Invalid user or password");
  }
};

module.exports = { createUser, updateUser, deleteUser };
