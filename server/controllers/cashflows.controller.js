const {
  getCashflowAndDashboard,
  getCashflow,
} = require("../services/cashflows.service");

const getCashflowController = async (req, res, next) => {
  try {
    const { type, assumptions } = req.body;
    const cashflow = getCashflow(type, assumptions);
    return res.status(200).json(cashflow);
  } catch (e) {
    next(e);
  }
};

const getCashflowAndDashboardController = async (req, res, next) => {
  try {
    const cashflowAndDashboard = await getCashflowAndDashboard(req.params.id);
    return res.status(200).json(cashflowAndDashboard);
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getCashflowController,
  getCashflowAndDashboardController,
};
