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
      const decodedToken = jwt.verify(request.token, process.env.SECRET);

      const dashboards = await Dashboard.find({ user: decodedToken.id });

      return response.status(200).json(dashboards);
    } catch (e) {
      next(e);
    }
  }
);

// dashboardRouter.get(
//   "/occupier",
//   middleware.tokenValidate,
//   async (request, response, next) => {
//     try {
//       const decodedToken = jwt.verify(request.token, process.env.SECRET);

//       const dashboards = await Dashboard.find({
//         user: decodedToken.id,
//         "dashboard.values.type": "occupier",
//       })

//       return response.status(200).json(dashboards);
//     } catch (e) {
//       next(e);
//     }
//   }
// );

// dashboardRouter.get(
//   "/investor",
//   middleware.tokenValidate,
//   async (request, response, next) => {
//     try {
//       const decodedToken = jwt.verify(request.token, process.env.SECRET);

//       const dashboards = await Dashboard.find({
//         user: decodedToken.id,
//         "dashboard.values.type": "investor",
//       })

//       return response.status(200).json(dashboards);
//     } catch (e) {
//       next(e);
//     }
//   }
// );

// dashboardRouter.get(
//   "/developer",
//   middleware.tokenValidate,
//   async (request, response, next) => {
//     try {
//       const decodedToken = jwt.verify(request.token, process.env.SECRET);

//       const dashboards = await Dashboard.find({
//         user: decodedToken.id,
//         "dashboard.values.type": "developer",
//       })

//       return response.status(200).json(dashboards);
//     } catch (e) {
//       next(e);
//     }
//   }
// );

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
  middleware.dashboardValidate,
  middleware.tokenValidate,
  async (request, response, next) => {
    try {
      const { description, address, type, values } = request.body;

      const decodedToken = jwt.verify(request.token, process.env.SECRET);
      const dashboard = new Dashboard({
        description,
        address,
        date: Date.now(),
        values: { type, ...values },
        user: decodedToken.id,
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
  middleware.dashboardValidate,
  middleware.tokenValidate,
  async (request, response, next) => {
    try {
      const { type, address, description, values } = request.body;

      const updatedDashboard = {
        address,
        description,
        date: Date.now(),
        values: { type, ...values },
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

      if (dashboard.user.toString() === decodedToken.id) {
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
