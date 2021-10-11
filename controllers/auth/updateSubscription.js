const { User } = require("../../models");
const { updateSubscriptionSchema } = require("../../models/user");
const { NotFound } = require("http-errors");

const updateSubscription = async (req, res, next) => {
  const { error } = updateSubscriptionSchema.validate(req.body);
  if (error) {
    throw new Error(error.message);
  }
  const updateStatus = await User.findByIdAndUpdate(
    req.user._id,
    { subscription: req.body.subscription },
    { new: true }
  ).select("_id email subscription");

  if (updateStatus) {
    return res.json(updateStatus);
  }
  throw new NotFound("Not Found");
};
module.exports = updateSubscription;
