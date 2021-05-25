const {
  isAuthenticated,
  isAdminOrDashboardOwner,
} = require("../utils/authMiddleware");
const { assumptionsValidate } = require("../utils/middleware");
const {
  createDashboardController,
  getDashboardsController,
  getDashboardController,
  updateDashboardController,
  deleteDashboardController,
} = require("../controllers/dashboards.controller");

const dashboardsRouter = require("express").Router();

dashboardsRouter.post("/", assumptionsValidate, createDashboardController);
dashboardsRouter.get("/", isAuthenticated, getDashboardsController);
dashboardsRouter.get(
  "/:id",
  isAuthenticated,
  isAdminOrDashboardOwner,
  getDashboardController
);
dashboardsRouter.put(
  "/:id",
  isAuthenticated,
  assumptionsValidate,
  isAdminOrDashboardOwner,
  updateDashboardController
);
dashboardsRouter.delete(
  "/:id",
  isAuthenticated,
  isAdminOrDashboardOwner,
  deleteDashboardController
);

module.exports = dashboardsRouter;
