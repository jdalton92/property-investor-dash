const authRouter = require("./auth.route");
const usersRouter = require("./users.route");
const dashboardsRouter = require("./dashboards.route");
const cashflowsRouter = require("./cashflows.route");
const contactRouter = require("./contact.route");

const v1Routes = require("express").Router();

v1Routes.use("/auth", authRouter);
v1Routes.use("/cashflows", cashflowsRouter);
v1Routes.use("/dashboards", dashboardsRouter);
v1Routes.use("/users", usersRouter);
v1Routes.use("/contact", contactRouter);

module.exports = v1Routes;
