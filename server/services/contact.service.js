const sendEmail = require("../utils/email");

const contact = async (fullName, company, email, message) => {
  const date = new Intl.DateTimeFormat("en-GB").format(Date.now());

  if (!fullName || !email || !message) {
    throw new Error("Full name, email, and message required", 400);
    // return next(
    //   new ValidationError(400, "Full name, email, and message required")
    // );
  }

  await sendEmail(
    `"${fullName}" <${email}>`,
    process.env.EMAIL,
    "New Message",
    "./templates/new-message.handlebars",
    { date, fullName, company, email, message }
  );
};

module.exports = { contact };
