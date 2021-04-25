const jwt = require("jsonwebtoken");

const userTokenParser = (user) => {
  const userForToken = {
    email: user.email,
    id: user._id,
  };

  const token = jwt.sign(userForToken, process.env.SECRET);

  return {
    token,
    id: user._id,
    email: user.email,
    messagesRead: user.messagesRead,
  };
};

module.exports = { userTokenParser };
