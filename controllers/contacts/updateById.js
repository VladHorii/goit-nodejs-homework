const contactsFn = require("../../model/contacts");

const updateById = async (req, res, next) => {
  try {
    const updateStatus = await contactsFn.updateContact(
      req.params.contactId,
      req.query
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
