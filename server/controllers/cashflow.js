const cashflowRouter = require("express").Router();
const middleware = require("../utils/middleware");
const ValidationError = require("../utils/error");
const parsers = require("../utils/parsers");

cashflowRouter.get(
  "/",
  middleware.assumptionsValidate,
  middleware.tokenValidate,
  async (request, response, next) => {
    try {
      const { type, assumptions } = request.body;

      if (!type || !assumptions.length) {
        return next(
          new ValidationError(400, "fields are required: `type`, `assumptions`")
        );
      }

      let cashflow;
      switch (type) {
        case "developer":
          cashflow = parsers.developerCashflow(assumptions);
          break;
        case "investor":
        case "occupier":
          cashflow = parsers.occupierInvestorCashflow(assumptions);
          break;
        default:
          return next(
            new ValidationError(
              400,
              "`type` must be 'occupier', 'investor', or 'developer'"
            )
          );
      }

      return response.status(200).json(cashflow);
    } catch (e) {
      next(e);
    }
  }
);

module.exports = cashflowRouter;
