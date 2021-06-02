const {
  initUserController,
  loginController,
  logoutController,
  demoUserController,
  requestPasswordResetController,
  resetPasswordController,
} = require("../controllers/auth.controller");

const authRouter = require("express").Router();

authRouter.get("/init-user", initUserController);
authRouter.post("/login", loginController);
authRouter.post("/logout", logoutController);
authRouter.post("/demo", demoUserController);
authRouter.post("/request-password-reset", requestPasswordResetController);
authRouter.post("/reset-password", resetPasswordController);

module.exports = authRouter;
