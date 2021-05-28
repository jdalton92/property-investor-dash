const { contact } = require("../services/contact.service");

const contactController = async (req, res, next) => {
  try {
    const { fullName, company, email, message } = req.body;

    await contact(fullName, company, email, message);

    return res.status(200).json({
      message: "Email sent",
    });
  } catch (e) {
    next(e);
  }
};

module.exports = { contactController };
