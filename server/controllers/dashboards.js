const dashboardRouter = require("express").Router();
const auth = require("../auth/authMiddleware");
const middleware = require("../utils/middleware");
const Dashboard = require("../models/dashboard");
const User = require("../models/user");
const ValidationError = require("../utils/error");

dashboardRouter.get(
  "/",
  auth.isAuthenticated,
  async (request, response, next) => {
    try {
      const type = request.query.type;
      const types = ["developer", "investor", "occupier"];
      if (type && !types.includes(type)) {
        return next(
          new ValidationError(
            400,
            "`type` must be 'occupier', 'investor', or 'developer'"
          )
        );
      }

      const query = { user: request.user._id };
      if (type) {
        query.type = type;
      }
      const options = {
        exclude: "-assumptions",
        page: request.query.page,
        limit: request.query.limit,
        sort: "-created",
      };

      await Dashboard.paginate(query, options, (err, res) => {
        return response.status(200).json(res);
      });
    } catch (e) {
      next(e);
    }
  }
);

dashboardRouter.get(
  "/:id",
  auth.isAuthenticated,
  auth.isAdminOrDashboardOwner,
  async (request, response, next) => {
    try {
      const dashboard = await Dashboard.findById(request.params.id);

      return response.status(200).json(dashboard);
    } catch (e) {
      next(e);
    }
  }
);

dashboardRouter.post(
  "/",
  middleware.assumptionsValidate,
  auth.isAuthenticated,
  async (request, response, next) => {
    try {
      const { description, address, type, assumptions } = request.body;

      const types = ["developer", "investor", "occupier"];
      if (!type || !types.includes(type)) {
        return next(
          new ValidationError(
            400,
            "`type` must be 'occupier', 'investor', or 'developer'"
          )
        );
      }

      const dashboard = new Dashboard({
        user: request.user._id,
        description,
        address,
        type,
        assumptions,
      });
      const result = await dashboard.save();

      await User.findOneAndUpdate(
        { _id: request.user._id },
        { $push: { dashboards: result._id } }
      );

      return response.status(201).json(result);
    } catch (e) {
      next(e);
    }
  }
);

dashboardRouter.put(
  "/:id",
  middleware.assumptionsValidate,
  auth.isAuthenticated,
  auth.isAdminOrDashboardOwner,
  async (request, response, next) => {
    try {
      const { type, address, description, assumptions } = request.body;

      const dashboard = await Dashboard.findById(request.params.id);
      const updatedDashboard = {
        __v: dashboard.__v,
        user: dashboard.user,
        created: dashboard.created,
        updated: Date.now(),
        address,
        description,
        type,
        assumptions,
      };

      // TODO: Update without fetching dashboard first, as updating nested
      // object `assumptions` merges new/old assumptions if not including
      // `overwrite: true`
      const result = await Dashboard.findByIdAndUpdate(
        request.params.id,
        updatedDashboard,
        { new: true, overwrite: true }
      );

      response.status(200).json(result);
    } catch (e) {
      next(e);
    }
  }
);

dashboardRouter.delete(
  "/:id",
  auth.isAuthenticated,
  auth.isAdminOrDashboardOwner,
  async (request, response, next) => {
    try {
      const dashboardId = request.params.id;

      await Dashboard.findByIdAndRemove(dashboardId);
      await User.findOneAndUpdate(
        { _id: request.user._id },
        { $pull: { dashboards: dashboardId } }
      );
      return response.status(204).end();
    } catch (e) {
      next(e);
    }
  }
);

module.exports = dashboardRouter;
