const crypto = require("crypto");
const User = require("../models/user.model");
const Token = require("../models/token.model");
const Dashboard = require("../models/dashboard.model");
const { getUserAndToken } = require("../utils/parsers");
const {
  occupierDashboardAssumptions,
  investorDashboardAssumptions,
  developerDashboardAssumptions,
} = require("./constants");

const getTestUserAndToken = async (email, password) => {
  // Password hashing handled in pre save hook
  const user = new User({
    email: email || process.env.TEST_USER_EMAIL,
    passwordHash: password || process.env.TEST_USER_PASSWORD,
    hasAcceptedTCs: true,
  });
  await user.save();

  const userResponse = getUserAndToken(user);

  return userResponse;
};

const getPasswordResetToken = async (userId) => {
  await Token.find({ user: userId }).deleteMany();
  const resetToken = crypto.randomBytes(32).toString("hex");

  // Token hashing handled in pre save hook
  await new Token({ user: userId, tokenHash: resetToken }).save();

  return resetToken;
};

const getTestOccupierDashboard = async (userId) => {
  const dashboard = await new Dashboard({
    user: userId,
    description: "Test occupier dashboard",
    address: "Test address",
    type: "occupier",
    assumptions: occupierDashboardAssumptions,
  }).save();

  await User.findByIdAndUpdate(userId, {
    $push: { dashboards: dashboard._id },
  });

  return dashboard;
};

const getTestInvestorDashboard = async (userId) => {
  const dashboard = await new Dashboard({
    user: userId,
    description: "Test investor dashboard",
    address: "Test address",
    type: "investor",
    assumptions: investorDashboardAssumptions,
  }).save();

  await User.findByIdAndUpdate(userId, {
    $push: { dashboards: dashboard._id },
  });

  return dashboard;
};

const getTestDeveloperDashboard = async (userId) => {
  const dashboard = await new Dashboard({
    user: userId,
    description: "Test dashboard",
    address: "Test address",
    type: "developer",
    assumptions: developerDashboardAssumptions,
  }).save();

  await User.findByIdAndUpdate(userId, {
    $push: { dashboards: dashboard._id },
  });

  return dashboard;
};

module.exports = {
  getTestUserAndToken,
  getPasswordResetToken,
  getTestOccupierDashboard,
  getTestInvestorDashboard,
  getTestDeveloperDashboard,
};
