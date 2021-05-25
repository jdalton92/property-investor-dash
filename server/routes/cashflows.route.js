const {
  isAuthenticated,
  isAdminOrDashboardOwner,
} = require("../utils/authMiddleware");
const { assumptionsValidate } = require("../utils/middleware");
const {
  getCashflowController,
  getCashflowAndDashboardController,
} = require("../controllers/cashflows.controller");

const cashflowsRouter = require("express").Router();

cashflowsRouter.post("/", assumptionsValidate, getCashflowController);
cashflowsRouter.get(
  "/:id",
  isAuthenticated,
  isAdminOrDashboardOwner,
  getCashflowAndDashboardController
);

module.exports = cashflowsRouter;
