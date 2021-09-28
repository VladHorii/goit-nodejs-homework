const contactsFn = require("../../model/contacts");
const contactSchema = require("../../schemas/contact");

const add = async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.query);
    if (error) {
      const err = new Error(error.message);
      err.status = 400;
      throw err;
    }
    const newContact = await contactsFn.addContact(req.query);
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
};
module.exports = add;
