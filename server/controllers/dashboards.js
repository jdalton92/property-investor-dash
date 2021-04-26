const dashboardRouter = require("express").Router();
const middleware = require("../utils/middleware");
const jwt = require("jsonwebtoken");
const Dashboard = require("../models/dashboard");
const User = require("../models/user");
const ValidationError = require("../utils/error");

dashboardRouter.get(
  "/",
  middleware.tokenValidate,
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

      const decodedToken = jwt.verify(request.token, process.env.SECRET);
      const query = { user: decodedToken.id };
      const options = {
        page: request.query.page,
        limit: request.query.limit,
        sort: "-date",
      };
      if (type) {
        query.type = type;
      }

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
  middleware.tokenValidate,
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
  // middleware.dashboardValidate,
  middleware.tokenValidate,
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

      const decodedToken = jwt.verify(request.token, process.env.SECRET);
      const dashboard = new Dashboard({
        user: decodedToken.id,
        description,
        address,
        type,
        assumptions,
      });
      const result = await dashboard.save();

      await User.findOneAndUpdate(
        { _id: decodedToken.id },
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
  // middleware.dashboardValidate,
  middleware.tokenValidate,
  async (request, response, next) => {
    try {
      const { type, address, description, assumptions } = request.body;

      const updatedDashboard = {
        date: Date.now(),
        address,
        description,
        type,
        assumptions,
      };

      const result = await Dashboard.findByIdAndUpdate(
        request.params.id,
        updatedDashboard,
        { new: true }
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
      const dashboardId = request.params.id;
      const decodedToken = jwt.verify(request.token, process.env.SECRET);

      const dashboard = await Dashboard.findById(dashboardId);

      if (dashboard?.user.toString() === decodedToken.id) {
        await Dashboard.findByIdAndRemove(dashboardId);
        await User.findOneAndUpdate(
          { _id: decodedToken.id },
          { $pull: { dashboards: dashboardId } }
        );
        return response.status(204).end();
      } else {
        return next(new ValidationError(404, "Not found"));
      }
    } catch (e) {
      next(e);
    }
  }
);

module.exports = dashboardRouter;
