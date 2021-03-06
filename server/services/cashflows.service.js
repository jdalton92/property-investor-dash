const Dashboard = require("../models/dashboard.model");
const Exception = require("../utils/error");
const {
  getDeveloperCashflow,
  getOccupierInvestorCashflow,
} = require("../utils/cashflows");

const getCashflowAndDashboard = async (dashboardId) => {
  const dashboard = await Dashboard.findById(dashboardId);
  if (!dashboard) {
    throw new Exception("Dashboard does not exist", 400);
  }
  const cashflow = getCashflow(dashboard.type, dashboard.assumptions);

  return { dashboard, cashflow };
};

const getCashflow = (type, assumptions) => {
  let cashflow;
  switch (type) {
    case "developer":
      cashflow = getDeveloperCashflow(assumptions);
      break;
    case "investor":
    case "occupier":
      cashflow = getOccupierInvestorCashflow(assumptions);
      break;
    default:
      throw new Exception(
        "`type` must be 'occupier', 'investor', or 'developer'",
        400
      );
  }
  return cashflow;
};

module.exports = {
  getCashflowAndDashboard,
  getCashflow,
};
