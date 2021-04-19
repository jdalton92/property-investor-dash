const logger = require("./logger");
const jwt = require("jsonwebtoken");
const ValidationError = require("../utils/error");

const requestLogger = (request, response, next) => {
  logger.info("Method:", request.method);
  logger.info("Path:  ", request.path);
  logger.info("Body:  ", request.body);
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
    logger.error(error.message);
    const status = error.status || error.statusCode || 500;
    const message =
      error.message || error.statusMessage || "Internal Server Error";

    return response.status(status).send({
      status,
      message,
    });
  }

  next(error);
};

const dashboardValidate = (request, response, next) => {
  let { type, values } = request.body;

  // Non-required fields default to zero
  const nonRequiredDeveloperInputs = [
    "acquisitionCosts",
    "designFees",
    "statutoryFees",
    "investmentPeriod",
    "sellingCosts",
    "recurringCosts",
    "capitalGrowth",
    "constructionCostGrowth",
  ];

  const nonRequiredOccupierInvestorInputs = [
    "sellingCosts",
    "capitalGrowth",
    "upfrontCosts",
    "recurringCosts",
    "inflation",
  ];

  if (type === "developer") {
    nonRequiredDeveloperInputs.forEach((i) => {
      if (!values[i]) {
        values[i] = 0;
      }
    });
  } else {
    nonRequiredOccupierInvestorInputs.forEach((i) => {
      if (!values[i]) {
        values[i] = 0;
      }
    });
  }
  request.body.values = values;
  next();
};

module.exports = {
  errorHandler,
  tokenExtractor,
  tokenValidate,
  requestLogger,
  dashboardValidate,
};
