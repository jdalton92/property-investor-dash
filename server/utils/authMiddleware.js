const jwt = require("jsonwebtoken");
const Exception = require("../utils/error");

const isAuthenticated = (req, res, next) => {
  if (!req.token) {
    throw new Exception(401, "Login required");
  }

  const decodedToken = jwt.verify(req.token, process.env.SECRET);

  if (!decodedToken.id) {
    throw new Exception(401, "Token missing or invalid");
  }

  next();
};

const isAdminOrDashboardOwner = (req, res, next) => {
  if (req.user.roles.includes("admin")) {
    return next();
  }

  if (!req.user.dashboards.includes(req.params.id)) {
    throw new Exception(
      403,
      "You do not have permission to access this resource"
    );
  }
  next();
};

const isAdminOrUserOwner = (req, res, next) => {
  if (req.user.roles.includes("admin")) {
    return next();
  }

  if (req.user._id.toString() !== req.params.id) {
    throw new Exception(
      403,
      "You do not have permission to access this resource"
    );
  }
  next();
};

const isNotDemoUser = (req, res, next) => {
  if (req.user.roles.includes("demo")) {
    throw new Exception(
      403,
      "Demo user does not have permission for this action"
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
