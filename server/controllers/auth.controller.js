const {
  loginUser,
  demoUser,
  requestPasswordReset,
  resetPassword,
} = require("../services/auth.service");

const loginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await loginUser(email, password);
    req.session.user = user;
    return res.status(200).json(user);
  } catch (e) {
    next(e);
  }
};

const logoutController = async (req, res, next) => {
  try {
    await req.session.destroy();
    return res.status(204).end();
  } catch (e) {
    next(e);
  }
};

const demoUserController = async (req, res, next) => {
  try {
    const user = await demoUser();
    req.session.user = user;
    return res.status(200).json(user);
  } catch (e) {
    next(e);
  }
};

const requestPasswordResetController = async (req, res, next) => {
  try {
    const { email } = req.body;

    await requestPasswordReset(email);

    return res
      .status(200)
      .json({ message: `An email has been sent to ${email}` });
  } catch (e) {
    next(e);
  }
};

const resetPasswordController = async (req, res, next) => {
  try {
    const { id, token, password, checkPassword } = req.body;
    const user = await resetPassword(id, token, password, checkPassword);
    req.session.user = user;
    return res.status(200).json(user);
  } catch (e) {
    next(e);
  }
};

module.exports = {
  loginController,
  logoutController,
  demoUserController,
  requestPasswordResetController,
  resetPasswordController,
};
