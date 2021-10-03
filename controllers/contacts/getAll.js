const { Contact } = require("../../model");

const getAll = async (req, res, next) => {
  try {
    const contactslist = await Contact.find(
      {},
      "_id name email phone favorite"
    );
    res.json(contactslist);
  } catch (error) {
    next(error);
  }
};
module.exports = getAll;
