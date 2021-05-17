const logger = require("./logger");
const jwt = require("jsonwebtoken");
const ValidationError = require("../utils/error");

const requestLogger = (request, response, next) => {
  logger.info(
    "IP:          ",
    request.headers["x-forwarded-for"] ||
      request.connection.remoteAddress ||
      request.ip
  );
  logger.info("Method:      ", request.method);
  logger.info("Path:        ", request.path);
  logger.info("Body:        ", request.body);
  logger.info("Res status:  ", response.statusCode);
  logger.info("---");
  next();
};

const getTokenFrom = (request) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    return authorization.substring(7);
  }
  return null;
};

const tokenExtractor = (request, response, next) => {
  request.token = getTokenFrom(request);
  next();
};

const tokenValidate = async (request, response, next) => {
  if (!request.token) {
    return next(new ValidationError(401, "Login required"));
  }

  const decodedToken = jwt.verify(request.token, process.env.SECRET);

  if (!decodedToken.id) {
    return next(new ValidationError(401, "Token missing or invalid"));
  }

  next();
};

const errorHandler = (error, request, response, next) => {
  if (error) {
    const status = error.status || error.statusCode || 500;
    const message =
      error.message || error.statusMessage || "Internal Server Error";
    logger.error(error);

    return response.status(status).send({
      status,
      message,
    });
  }

  next(error);
};

const assumptionsValidate = (request, response, next) => {
  let { type, assumptions } = request.body;
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
      return next(
        new ValidationError(
          400,
          "`type` must be 'occupier', 'investor', or 'developer'"
        )
      );
  }

  fields.forEach((f) => {
    if (!templateFields.includes(f)) {
      return next(new ValidationError(400, `Invalid field: ${f}`));
    }
  });

  next();
};

module.exports = {
  errorHandler,
  tokenExtractor,
  tokenValidate,
  requestLogger,
  assumptionsValidate,
};
