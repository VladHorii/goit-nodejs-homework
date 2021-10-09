const { Contact } = require("../../models");

const getAll = async (req, res) => {
  const contactslist = await Contact.find(
    { owner: req.user._id, ...req.query },
    "_id name email phone favorite owner"
  );
  res.json(contactslist);
};
module.exports = getAll;
