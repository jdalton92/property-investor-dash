const {
  createUser,
  updateUser,
  deleteUser,
} = require("../services/users.service");

const createUserController = async (req, res, next) => {
  try {
    const { password, email, checkPassword, hasAcceptedTCs } = req.body;

    const user = await createUser(
      password,
      email,
      checkPassword,
      hasAcceptedTCs
    );

    return res.status(201).json(user);
  } catch (e) {
    next(e);
  }
};

const updateUserController = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const user = await updateUser(userId, req.body);
    return res.status(200).json(user);
  } catch (e) {
    next(e);
  }
};

const deleteUserController = async (req, res, next) => {
  try {
    const { password } = req.body;
    const userId = req.params.id;

    await deleteUser(userId, password);
    return res.status(204).end();
  } catch (e) {
    next(e);
  }
};

module.exports = {
  createUserController,
  updateUserController,
  deleteUserController,
};
