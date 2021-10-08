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
  // try {
  //   const { error } = updateSubscriptionSchema.validate(req.body);
  //   if (error) {
  //     const err = new Error("missing field favorite");
  //     err.status = 400;
  //     throw err;
  //   }

  //   const updateStatus = await Contact.findByIdAndUpdate(
  //     req.params.contactId,
  //     { favorite: req.body.favorite },
  //     { new: true }
  //   );

  //   if (updateStatus) {
  //     return res.json(updateStatus);
  //   }
  //   const err = new Error("Not Found");
  //   err.status = 404;
  //   throw err;
  // } catch (error) {
  //   next(error);
  // }
};
module.exports = updateSubscription;
