const emailRouter = require("express").Router();
const nodemailer = require("nodemailer");
const mailGun = require("nodemailer-mailgun-transport");
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

    const auth = {
      auth: {
        api_key: process.env.API_KEY,
        domain: process.env.DOMAIN,
      },
    };

    const transporter = nodemailer.createTransport(mailGun(auth));

    const mailOptions = {
      from: `"${fullName}" <${email}>`,
      to: process.env.EMAIL,
      subject: "PropertyInvestorDash: New Message",
      text: `
      Date: ${date}
      Name: ${fullName}
      Email: ${email}
      Company: ${company}

      ${message}
      `,
    };

    await transporter.sendMail(mailOptions);

    return response.status(200).send({
      message: "Email sent",
    });
  } catch (e) {
    next(e);
  }
});

module.exports = emailRouter;
