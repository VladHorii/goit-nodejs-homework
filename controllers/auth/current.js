const { User } = require("../../models");

const current = async (req, res) => {
  const { _id } = req.user;
  const user = await User.findById(_id, "email subscription");
  const { email, subscription } = user;
  res.json({
    status: "200",
    code: 200,
    RequestBody: {
      email,
      subscription,
    },
  });
};

module.exports = current;
