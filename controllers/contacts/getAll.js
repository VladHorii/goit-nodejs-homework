const contactsFn = require("../../model/contacts");

const getAll = async (req, res, next) => {
  try {
    const contactslist = await contactsFn.listContacts();
    res.json(contactslist);
  } catch (error) {
    next(error);
  }
};
module.exports = getAll;
