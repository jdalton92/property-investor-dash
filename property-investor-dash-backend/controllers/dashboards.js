const dashboardRouter = require("express").Router();
const middleware = require("../utils/middleware");
const jwt = require("jsonwebtoken");
const Dashboard = require("../models/dashboard");
const User = require("../models/user");

dashboardRouter.get(
  "/",
  middleware.tokenValidate,
  async (request, response, next) => {
    try {
      const decodedToken = jwt.verify(request.token, process.env.SECRET);

      const user = await User.findById(decodedToken.id);

      const dashboards = await Dashboard.find({
        user: user._id
      }).populate("user", { username: 1, email: 1 });

      response.json(dashboards);
    } catch (e) {
      next(e);
    }
  }
);

dashboardRouter.get(
  "/:id",
  middleware.tokenValidate,
  async (request, response, next) => {
    try {
      const dashboard = await Dashboard.findById(
        request.params.id
      ).populate("user", { username: 1, email: 1 });

      response.json(dashboard);
    } catch (e) {
      next(e);
    }
  }
);

dashboardRouter.post(
  "/",
  middleware.dashboardValidate,
  middleware.tokenValidate,
  async (request, response, next) => {
    try {
      const { description, address, type, values } = request.body;

      const dashboard = new Dashboard({
        description,
        address,
        date: Date.now(),
        values: { type, ...values }
      });

      const decodedToken = jwt.verify(request.token, process.env.SECRET);

      const user = await User.findById(decodedToken.id);

      dashboard.user = user._id;

      await dashboard.save();

      user.dashboards = user.dashboards.concat(dashboard);

      await user.save();

      const result = await Dashboard.findById(dashboard._id).populate("user", {
        username: 1,
        name: 1
      });

      response.status(201).json(result);
    } catch (e) {
      next(e);
    }
  }
);

dashboardRouter.put(
  "/:id",
  middleware.dashboardValidate,
  middleware.tokenValidate,
  async (request, response, next) => {
    try {
      const { type, address, description, values } = request.body;

      const updatedDashboard = {
        address,
        description,
        date: Date.now(),
        values: { type, ...values }
      };

      const result = await Dashboard.findByIdAndUpdate(
        request.params.id,
        updatedDashboard,
        {
          new: true
        }
      );

      response.status(200).json(result);
    } catch (e) {
      next(e);
    }
  }
);

dashboardRouter.delete(
  "/:id",
  middleware.tokenValidate,
  async (request, response, next) => {
    try {
      const decodedToken = jwt.verify(request.token, process.env.SECRET);

      const dashboard = await Dashboard.findById(request.params.id);

      if (dashboard.user.toString() === decodedToken.id) {
        await Dashboard.findByIdAndRemove(request.params.id);
        response.status(204).end();
      } else {
        response.status(404).end();
      }
    } catch (e) {
      next(e);
    }
  }
);

module.exports = dashboardRouter;
