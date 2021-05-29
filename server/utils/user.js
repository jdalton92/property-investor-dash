const serializeUser = (user) => {
  return {
    _id: user._id,
    email: user.email,
    hasAcceptedTCs: user.hasAcceptedTCs,
    roles: user.roles,
    messagesRead: user.messagesRead,
    dashboards: user.dashboards,
  };
};

module.exports = {
  serializeUser,
};
