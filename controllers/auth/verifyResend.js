const { BadRequest } = require("http-errors");
const { sendEmail } = require("../../helpers");
const { User } = require("../../models");

const verifyResend = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    throw new BadRequest("missing required field email");
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new BadRequest("Error email");
  }
  if (user.verify || !user.verifyToken) {
    throw new BadRequest("Verification has already been passed");
  }

  const data = {
    to: email,
    subject: "Подтверждение регистрации на сайте",
    html: `<a href="http://localhost:3000/api/users/verify/${user.verifyToken}" target="_blank">Для подтрвеждения почты перейдите по ссылке</a>`,
  };

  await sendEmail(data);

  res.json({
    status: "200 OK",
    code: 200,
    message: "Verification email sent",
  });
};

module.exports = verifyResend;
