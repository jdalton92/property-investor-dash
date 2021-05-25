const jwt = require("jsonwebtoken");
const ValidationError = require("../utils/error");

const isAuthenticated = (request, response, next) => {
  if (!request.token) {
    return next(new ValidationError(401, "Login required"));
  }

  const decodedToken = jwt.verify(request.token, process.env.SECRET);

  if (!decodedToken.id) {
    return next(new ValidationError(401, "Token missing or invalid"));
  }

  next();
};

const isAdminOrDashboardOwner = (request, response, next) => {
  if (request.user.roles.includes("admin")) {
    return next();
  }

  if (!request.user.dashboards.includes(request.params.id)) {
    return next(
      new ValidationError(
        403,
        "You do not have permission to access this resource"
      )
    );
  }
  next();
};

const isAdminOrUserOwner = (request, response, next) => {
  if (request.user.roles.includes("admin")) {
    return next();
  }

  if (request.user._id.toString() !== request.params.id) {
    return next(
      new ValidationError(
        403,
        "You do not have permission to access this resource"
      )
    );
  }
  next();
};

const isNotDemoUser = (request, response, next) => {
  if (request.user.roles.includes("demo")) {
    return next(
      new ValidationError(
        403,
        "Demo user does not have permission for this action"
      )
    );
  }

  next();
};

module.exports = {
  isAuthenticated,
  isAdminOrDashboardOwner,
  isAdminOrUserOwner,
  isNotDemoUser,
};
