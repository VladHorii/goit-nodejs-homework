const { Contact } = require("../../model");

const getById = async (req, res, next) => {
  try {
    const foundContact = await Contact.findById(
      req.params.contactId,
      "_id name email phone favorite"
    );

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
