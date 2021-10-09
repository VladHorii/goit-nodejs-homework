const { Unauthorized } = require("http-errors");
const jwt = require("jsonwebtoken");
const { User } = require("../../models");
const { SECRET_KEY } = process.env;

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }, "_id email password subscription");
  if (!user || !user.comparePassword(password)) {
    throw new Unauthorized("Email or password is wrong");
  }
  const { _id, subscription } = user;
  const payload = {
    _id,
  };
  const token = jwt.sign(payload, SECRET_KEY);
  await User.findByIdAndUpdate(_id, { token });
  res.json({
    status: "success",
    code: 200,
    RequestBody: {
      token,
      user: {
        email,
        subscription,
      },
    },
  });
};

module.exports = login;
