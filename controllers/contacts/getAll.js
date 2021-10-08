const { Contact } = require("../../models");

const getAll = async (req, res) => {
  const contactslist = await Contact.find(
    req.query,
    "_id name email phone favorite owner"
  );
  res.json(contactslist);
};
module.exports = getAll;
