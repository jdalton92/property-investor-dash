const Exception = require("./error");
const config = require("./config");

const configHeaders = (req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Origin", config.FRONTEND_URL);
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Set-Cookie"
  );
  next();
};

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

  if (!req.session.user.dashboards.includes(req.params.id)) {
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

  if (req.session.user._id.toString() !== req.params.id) {
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
  configHeaders,
  isAuthenticated,
  isAdminOrDashboardOwner,
  isAdminOrUserOwner,
  isNotDemoUser,
};
