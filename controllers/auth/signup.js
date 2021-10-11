const { Conflict } = require("http-errors");
const { User } = require("../../models");
const gravatar = require("gravatar");

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
  const newUser = new User({ email, avatarURL });
  newUser.setPassword(password);
  await newUser.save();
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
