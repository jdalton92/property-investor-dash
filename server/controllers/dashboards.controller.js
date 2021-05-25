const {
  createDashboard,
  getDashboard,
  getDashboards,
  updateDashboard,
  deleteDashboard,
} = require("../services/dashboards.service");

const createDashboardController = async (req, res, next) => {
  try {
    const { description, address, type, assumptions } = req.body;
    const userId = req.user._id;

    const dashboard = await createDashboard(
      userId,
      description,
      address,
      type,
      assumptions
    );
    return res.status(201).json(dashboard);
  } catch (e) {
    next(e);
  }
};

const getDashboardController = async (req, res, next) => {
  try {
    const dashboard = await getDashboard(req.params.id);
    return res.status(200).json(dashboard);
  } catch (e) {
    next(e);
  }
};

const getDashboardsController = async (req, res, next) => {
  try {
    const dashboardType = req.query.type;
    const paginateOptions = {
      page: req.query.page,
      limit: req.query.limit,
    };
    const userId = req.user._id;
    const dashboards = await getDashboards(
      userId,
      dashboardType,
      paginateOptions
    );
    return res.status(200).json(dashboards);
  } catch (e) {
    next(e);
  }
};

const updateDashboardController = async (req, res, next) => {
  try {
    const { type, address, description, assumptions } = req.body;
    const dashboardId = req.params.id;

    const dashboard = await updateDashboard(
      dashboardId,
      type,
      address,
      description,
      assumptions
    );
    return res.status(200).json(dashboard);
  } catch (e) {
    next(e);
  }
};

const deleteDashboardController = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const dashboardId = req.params.id;
    await deleteDashboard(userId, dashboardId);
    return res.status(204).end();
  } catch (e) {
    next(e);
  }
};

module.exports = {
  createDashboardController,
  getDashboardsController,
  getDashboardController,
  updateDashboardController,
  deleteDashboardController,
};
