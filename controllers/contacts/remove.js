const { Contact } = require("../../models");
const { joiSchema } = require("../../models/contact");

const remove = async (req, res, next) => {
  try {
    const { error } = joiSchema.validate(req.body);
    if (error) {
      const err = new Error(error.message);
      err.status = 400;
      throw err;
    }

    const removeStatus = await Contact.findByIdAndRemove(req.params.contactId);

    if (removeStatus) {
      return res.json({ message: "contact deleted" });
    }
    const err = new Error("Not Found");
    err.status = 404;
    throw err;
  } catch (error) {
    next(error);
  }
};
module.exports = remove;
