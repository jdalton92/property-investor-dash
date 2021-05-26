const logger = require("./logger");
const jwt = require("jsonwebtoken");
const Exception = require("./error");
const User = require("../models/user.model");

const requestLogger = (req, res, next) => {
  logger.info(
    "IP:          ",
    req.headers["x-forwarded-for"] || req.connection.remoteAddress || req.ip
  );
  logger.info("Method:      ", req.method);
  logger.info("Path:        ", req.path);
  logger.info("Body:        ", req.body);
  logger.info("---");
  next();
};

const tokenExtractor = (req, res, next) => {
  let token = null;
  const authorization = req.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    token = authorization.substring(7);
  }
  req.token = token;
  next();
};

const userExtractor = async (req, res, next) => {
  let user = null;
  if (req.token) {
    const decodedToken = jwt.verify(req.token, process.env.SECRET);
    if (!decodedToken.id) {
      throw new Exception(401, "Token missing or invalid");
    }
    user = await User.findById(decodedToken.id);
    if (!user) {
      throw new Exception(404, "User not found");
    }
  }
  req.user = user;
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

const assumptionsValidate = (req, res, next) => {
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
  tokenExtractor,
  userExtractor,
  requestLogger,
  assumptionsValidate,
};
