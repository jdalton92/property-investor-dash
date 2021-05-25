const Dashboard = require("../models/dashboard.model");
const User = require("../models/user.model");

const getDashboards = async (userId, dashboardType, paginateOptions) => {
  const types = ["developer", "investor", "occupier"];
  if (dashboardType && !types.includes(dashboardType)) {
    throw new Error(
      "`type` must be 'occupier', 'investor', or 'developer'",
      400
    );
    // return next(
    //   new ValidationError(
    //     400,
    //     "`type` must be 'occupier', 'investor', or 'developer'"
    //   )
    // );
  }

  const query = { user: userId };
  if (dashboardType) {
    query.type = dashboardType;
  }
  const options = {
    exclude: "-assumptions",
    page: paginateOptions.page,
    limit: paginateOptions.limit,
    sort: "-created",
  };

  const res = await Dashboard.paginate(query, options);
  return res;
};

const getDashboard = async (id) => {
  const dashboard = await Dashboard.findById(id);
  return dashboard;
};

const createDashboard = async (
  userId,
  description,
  address,
  type,
  assumptions
) => {
  const types = ["developer", "investor", "occupier"];
  if (!type || !types.includes(type)) {
    throw new Error(
      "`type` must be 'occupier', 'investor', or 'developer'",
      400
    );
    // return next(
    //   new ValidationError(
    //     400,
    //     "`type` must be 'occupier', 'investor', or 'developer'"
    //   )
    // );
  }

  const dashboard = await Dashboard({
    user: userId,
    description,
    address,
    type,
    assumptions,
  }).save();

  await User.findByIdAndUpdate(userId, {
    $push: { dashboards: dashboard._id },
  });

  return dashboard;
};

const updateDashboard = async (
  dashboardId,
  type,
  address,
  description,
  assumptions
) => {
  const existingDashboard = await Dashboard.findById(dashboardId);

  if (!existingDashboard) {
    throw new Error("Dashboard does not exist", 404);
  }

  const updatedDashboard = {
    __v: existingDashboard.__v,
    user: existingDashboard.user,
    created: existingDashboard.created,
    updated: Date.now(),
    address,
    description,
    type,
    assumptions,
  };

  // TODO: Update without fetching dashboard first, as updating nested
  // object `assumptions` merges new/old assumptions if not including
  // `overwrite: true`
  const dashboard = await Dashboard.findByIdAndUpdate(
    dashboardId,
    updatedDashboard,
    { new: true, overwrite: true }
  );

  return dashboard;
};

const deleteDashboard = async (userId, dashboardId) => {
  await Dashboard.findByIdAndRemove(dashboardId);
  await User.findOneAndUpdate(
    { _id: userId },
    { $pull: { dashboards: dashboardId } }
  );
};

module.exports = {
  getDashboard,
  getDashboards,
  createDashboard,
  updateDashboard,
  deleteDashboard,
};
