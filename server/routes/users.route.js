const {
  isAuthenticated,
  isNotDemoUser,
  isAdminOrUserOwner,
} = require("../utils/authMiddleware");
const { isValidId } = require("../utils/middleware");
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
  isValidId,
  isNotDemoUser,
  isAdminOrUserOwner,
  updateUserController
);
usersRouter.delete(
  "/:id",
  isAuthenticated,
  isValidId,
  isNotDemoUser,
  isAdminOrUserOwner,
  deleteUserController
);

module.exports = usersRouter;
