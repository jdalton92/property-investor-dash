const authRouter = require("./auth.route");
const usersRouter = require("./users.route");
const dashboardsRouter = require("./dashboards.route");
const cashflowsRouter = require("./cashflows.route");
const contactRouter = require("./contact.route");

const mainRouter = require("express").Router();

mainRouter.use("/auth", authRouter);
mainRouter.use("/cashflows", cashflowsRouter);
mainRouter.use("/dashboards", dashboardsRouter);
mainRouter.use("/users", usersRouter);
mainRouter.use("/contact", contactRouter);

module.exports = mainRouter;
