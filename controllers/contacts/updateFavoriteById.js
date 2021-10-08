const { Contact } = require("../../models");
const { updateFavoriteJoiSchema } = require("../../models/contact");

const updateFavoriteById = async (req, res, next) => {
  try {
    const { error } = updateFavoriteJoiSchema.validate(req.body);
    if (error) {
      const err = new Error("missing field favorite");
      err.status = 400;
      throw err;
    }

    const updateStatus = await Contact.findOneAndUpdate(
      { owner: req.user._id, _id: req.params.contactId },
      { favorite: req.body.favorite },
      { new: true }
    );

    if (updateStatus) {
      return res.json(updateStatus);
    }
    const err = new Error("Not Found");
    err.status = 404;
    throw err;
  } catch (error) {
    next(error);
  }
};
module.exports = updateFavoriteById;
