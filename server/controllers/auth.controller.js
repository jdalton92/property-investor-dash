const {
  loginUser,
  demoUser,
  requestPasswordReset,
  resetPassword,
} = require("../services/auth.service");

const loginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const userAndToken = await loginUser(email, password);
    return res.status(200).send(userAndToken);
  } catch (e) {
    next(e);
  }
};

const demoUserController = async (req, res, next) => {
  try {
    const userAndToken = await demoUser();
    return res.status(200).send(userAndToken);
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
      .send({ message: `An email has been sent to ${email}` });
  } catch (e) {
    next(e);
  }
};

const resetPasswordController = async (req, res, next) => {
  try {
    const { id, token, password, checkPassword } = req.body;
    const userAndToken = await resetPassword(
      id,
      token,
      password,
      checkPassword
    );
    return res.status(200).send(userAndToken);
  } catch (e) {
    next(e);
  }
};

module.exports = {
  loginController,
  demoUserController,
  requestPasswordResetController,
  resetPasswordController,
};
