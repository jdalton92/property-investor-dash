const {
  loginController,
  demoUserController,
  requestPasswordResetController,
  resetPasswordController,
} = require("../controllers/auth.controller");

const authRouter = require("express").Router();

authRouter.post("/login", loginController);
authRouter.post("/demo", demoUserController);
authRouter.post("/request-password-reset", requestPasswordResetController);
authRouter.post("/reset-password", resetPasswordController);

module.exports = authRouter;
