const {
  isAuthenticated,
  isNotDemoUser,
  isAdminOrUserOwner,
} = require("../utils/authMiddleware");
const {
  createUserController,
  updateUserController,
  deleteUserController,
} = require("../controllers/users.controller");

const usersRouter = require("express").Router();

usersRouter.post("/", createUserController);
usersRouter.put(
  "/:id",
  isAuthenticated,
  isNotDemoUser,
  isAdminOrUserOwner,
  updateUserController
);
usersRouter.delete(
  "/:id",
  isAuthenticated,
  isNotDemoUser,
  isAdminOrUserOwner,
  deleteUserController
);

module.exports = usersRouter;
