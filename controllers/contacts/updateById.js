const { Contact } = require("../../models");

const updateById = async (req, res, next) => {
  const updateStatus = await Contact.findOneAndUpdate(
    { owner: req.user._id, _id: req.params.contactId },
    req.body,
    { new: true }
  );

  if (updateStatus) {
    res.json(updateStatus);
  }
  const error = new Error("Not Found");
  error.status = 404;
  throw error;
};
module.exports = updateById;
