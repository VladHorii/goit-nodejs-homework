const { Conflict } = require("http-errors");
const { User } = require("../../models");

const signup = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict("Email in use");
  }
  const newUser = new User({ email });
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
