const nodemailer = require("nodemailer");
const { EMAIL_PASSWORD } = process.env;

const nodemailerConfig = {
  host: "ruvip42.hostiman.ru",
  port: 25,
  secure: false,
  auth: {
    user: "info@horiisoft.h1n.ru",
    pass: EMAIL_PASSWORD,
  },
};

const transporter = nodemailer.createTransport(nodemailerConfig);

const sendEmail = async (data) => {
  const email = {
    ...data,
    from: "info@horiisoft.h1n.ru",
  };
  await transporter.sendMail(email);
};

module.exports = sendEmail;
