const Exception = require("../utils/error");

const isAuthenticated = (req, res, next) => {
  if (!req.session || !req.session.user) {
    req.session && req.session.destroy();
    throw new Exception(401, "Login required");
  }
  next();
};

const isAdminOrDashboardOwner = (req, res, next) => {
  if (req.session.user.roles.includes("admin")) {
    return next();
  }

  if (!req.session.user.dashboards.includes(id)) {
    throw new Exception(
      403,
      "You do not have permission to access this resource"
    );
  }
  next();
};

const isAdminOrUserOwner = (req, res, next) => {
  if (req.session.user.roles.includes("admin")) {
    return next();
  }

  if (req.session.user._id.toString() !== id) {
    throw new Exception(
      403,
      "You do not have permission to access this resource"
    );
  }
  next();
};

const isNotDemoUser = (req, res, next) => {
  if (req.session.user.roles.includes("demo")) {
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
