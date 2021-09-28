const contactsFn = require("../../model/contacts");

const getById = async (req, res, next) => {
  try {
    const foundContact = await contactsFn.getContactById(req.params.contactId);

    if (!foundContact) {
      const error = new Error("Not Found");
      error.status = 404;
      throw error;
    }

    res.json(foundContact);
  } catch (error) {
    next(error);
  }
};
module.exports = getById;
