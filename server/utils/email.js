const nodemailer = require("nodemailer");
const mailGun = require("nodemailer-mailgun-transport");
const handlebars = require("handlebars");
const fs = require("fs");
const path = require("path");

const sendEmail = async (from, to, subject, template, data) => {
  console.log("SEND EMAIL");
  return new Promise(async (resolve, reject) => {
    try {
      const auth = {
        auth: {
          api_key: process.env.API_KEY,
          domain: process.env.DOMAIN,
        },
      };

      const transporter = nodemailer.createTransport(mailGun(auth));

      const sourceHtml = fs.readFileSync(
        path.join(__dirname, template),
        "UTF8"
      );
      const compiledTemplate = handlebars.compile(sourceHtml);

      const mailOptions = {
        from,
        to,
        subject,
        html: compiledTemplate(data),
      };

      await transporter.sendMail(mailOptions);
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = sendEmail;
