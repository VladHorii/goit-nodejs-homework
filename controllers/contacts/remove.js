const contactSchema = require("../../schemas/contact");
const contactsFn = require("../../model/contacts");

const remove = async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.query);
    if (error) {
      const err = new Error(error.message);
      err.status = 400;
      throw err;
    }

    const removeStatus = await contactsFn.removeContact(req.params.contactId);
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
