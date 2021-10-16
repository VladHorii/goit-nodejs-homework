const { Conflict } = require("http-errors");
const { User } = require("../../models");
const gravatar = require("gravatar");
const { nanoid } = require("nanoid");
const { sendEmail } = require("../../helpers");

const signup = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict("Email in use");
  }
  const avatarURL = gravatar.url(
    email,
    { s: "100", r: "x", d: "retro" },
    false
  );
  const verifyToken = nanoid(6);

  const newUser = new User({ email, avatarURL, verifyToken });
  newUser.setPassword(password);
  await newUser.save();

  const data = {
    to: email,
    subject: "Подтверждение регистрации на сайте",
    html: `<a href="http://localhost:3000/api/users/verify/${verifyToken}" target="_blank">Для подтрвеждения почты перейдите по ссылке</a>`,
  };

  await sendEmail(data);

  res.status(201).json({
    status: "201 Created",
    code: 201,
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
};

module.exports = signup;
