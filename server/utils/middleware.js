const logger = require("./logger");
const config = require("./config");
const Exception = require("./error");
const idRegex = new RegExp(config.ID_REGEX);

const requestLogger = (req, res, next) => {
  logger.info(
    "IP:      ",
    req.headers["x-forwarded-for"] || req.connection.remoteAddress || req.ip
  );
  logger.info("Method:  ", req.method);
  logger.info("Path:    ", req.path);
  logger.info("Body:    ", req.body);
  logger.info("---");
  next();
};

const errorHandler = (error, req, res, next) => {
  if (error) {
    const status = error.status || error.statusCode || 500;
    const message =
      error.message || error.statusMessage || "Internal server error";
    logger.error(error);

    return res.status(status).send({
      status,
      message,
    });
  }

  next(error);
};

const isValidId = (req, res, next) => {
  const id = req.params.id;
  if (!idRegex.test(id)) {
    throw new Exception(400, "Invalid id");
  }
  next();
};

const isValidAssumptions = (req, res, next) => {
  let { type, assumptions } = req.body;
  const fields = Object.keys(assumptions);

  const occupierFields = [
    "capitalGrowth",
    "opexGrowth",
    "purchasePrice",
    "ownershipLength",
    "upfrontCosts",
    "sellingCosts",
    "opex",
    "deposit",
    "homeloanTerm",
    "repaymentType",
    "interestRate",
    "overPayment",
  ];
  const investorFields = occupierFields.concat("rentalYield");
  const developerFields = [
    "acquisitionPrice",
    "acquisitionCosts",
    "dwellings",
    "constructionCostPerDwelling",
    "designFees",
    "constructionContingency",
    "statutoryFees",
    "constructionDuration",
    "planningAndDesign",
    "revenuePerDwelling",
    "sellingCosts",
    "investmentPeriod",
    "recurringCosts",
    "rentalYield",
    "initialEquity",
    "repaymentType",
    "interestRate",
    "loanTerm",
    "overPayment",
    "capitalGrowth",
    "constructionCostGrowth",
  ];

  let templateFields;
  switch (type) {
    case "occupier":
      templateFields = occupierFields;
      break;
    case "investor":
      templateFields = investorFields;
      break;
    case "developer":
      templateFields = developerFields;
      break;
    default:
      throw new Exception(
        400,
        "`type` must be 'occupier', 'investor', or 'developer'"
      );
  }

  fields.forEach((f) => {
    if (!templateFields.includes(f)) {
      throw new Exception(400, `Invalid field: ${f}`);
    }
  });

  next();
};

module.exports = {
  errorHandler,
  requestLogger,
  isValidId,
  isValidAssumptions,
};
