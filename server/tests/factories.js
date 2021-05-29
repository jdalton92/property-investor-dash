const crypto = require("crypto");
const User = require("../models/user.model");
const Token = require("../models/token.model");
const Dashboard = require("../models/dashboard.model");
const { serializeUser } = require("../utils/user");
const {
  occupierDashboardAssumptions,
  investorDashboardAssumptions,
  developerDashboardAssumptions,
} = require("./constants");

const getTestUser = async (email, password) => {
  // Password hashing handled in pre save hook
  const user = new User({
    email: email || process.env.TEST_USER_EMAIL,
    passwordHash: password || process.env.TEST_USER_PASSWORD,
    hasAcceptedTCs: true,
  });
  await user.save();

  const userData = serializeUser(user);

  return userData;
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

const mockReq = (body, options = {}) => ({
  body,
  session: options.session || {},
  params: options.params || {},
  query: options.query || {},
});

const mockRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  res.end = jest.fn();
  return res;
};

const mockNext = () => {
  const next = jest.fn();
  return next;
};

const paginateArray = (arr, options) => {
  const limit = options.limit || 10;
  const page = options.page || 1;

  const resultsCount = arr.length;
  const pagesCount = Math.ceil(arr.length / limit);
  const startIndex = (page - 1) * limit;
  const endIndex = Math.min(resultsCount, page * limit);
  const results = arr.slice(startIndex, endIndex);

  return {
    pagesCount,
    nextPage: page < pagesCount ? page + 1 : null,
    previousPage: page - 1 > 0 ? page - 1 : null,
    resultsCount,
    results,
  };
};

module.exports = {
  getTestUser,
  getPasswordResetToken,
  getTestOccupierDashboard,
  getTestInvestorDashboard,
  getTestDeveloperDashboard,
  mockReq,
  mockRes,
  mockNext,
  paginateArray,
};
