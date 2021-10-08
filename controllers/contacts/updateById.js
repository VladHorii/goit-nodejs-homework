const { Contact } = require("../../model");

const updateById = async (req, res, next) => {
  try {
    const updateStatus = await Contact.findByIdAndUpdate(
      req.params.contactId,
      req.body,
      { new: true }
    );

    if (updateStatus) {
      res.json(updateStatus);
    }
    const error = new Error("Not Found");
    error.status = 404;
    throw error;
  } catch (error) {
    next(error);
  }
};
module.exports = updateById;
