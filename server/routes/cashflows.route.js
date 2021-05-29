const {
  isAuthenticated,
  isAdminOrDashboardOwner,
} = require("../utils/authMiddleware");
const { isValidId, isValidAssumptions } = require("../utils/middleware");
const {
  getCashflowController,
  getCashflowAndDashboardController,
} = require("../controllers/cashflows.controller");

const cashflowsRouter = require("express").Router();

cashflowsRouter.post("/", isValidAssumptions, getCashflowController);
cashflowsRouter.get(
  "/:id",
  isAuthenticated,
  isValidId,
  isAdminOrDashboardOwner,
  getCashflowAndDashboardController
);

module.exports = cashflowsRouter;
