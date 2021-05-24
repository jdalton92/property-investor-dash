const emailRouter = require("express").Router();
const sendEmail = require("../utils/email");
const ValidationError = require("../utils/error");

emailRouter.post("/", async (request, response, next) => {
  try {
    const { fullName, company, email, message } = request.body;
    const date = new Intl.DateTimeFormat("en-GB").format(Date.now());

    if (!fullName || !email || !message) {
      return next(
        new ValidationError(400, "Full name, email, and message required")
      );
    }

    await sendEmail(
      `"${fullName}" <${email}>`,
      process.env.EMAIL,
      "New Message",
      "./templates/new-message.handlebars",
      { date: Date.now(), fullName, company, email, message }
    );

    return response.status(200).send({
      message: "Email sent",
    });
  } catch (e) {
    next(e);
  }
});

module.exports = emailRouter;
