const {
  isAuthenticated,
  isAdminOrDashboardOwner,
} = require("../utils/authMiddleware");
const { isValidId, isValidAssumptions } = require("../utils/middleware");
const {
  createDashboardController,
  getDashboardsController,
  getDashboardController,
  updateDashboardController,
  deleteDashboardController,
} = require("../controllers/dashboards.controller");

const dashboardsRouter = require("express").Router();

dashboardsRouter.post(
  "/",
  isAuthenticated,
  isValidAssumptions,
  createDashboardController
);
dashboardsRouter.get("/", isAuthenticated, getDashboardsController);
dashboardsRouter.get(
  "/:id",
  isAuthenticated,
  isValidId,
  isAdminOrDashboardOwner,
  getDashboardController
);
dashboardsRouter.put(
  "/:id",
  isAuthenticated,
  isValidId,
  isValidAssumptions,
  isAdminOrDashboardOwner,
  updateDashboardController
);
dashboardsRouter.delete(
  "/:id",
  isAuthenticated,
  isValidId,
  isAdminOrDashboardOwner,
  deleteDashboardController
);

module.exports = dashboardsRouter;
