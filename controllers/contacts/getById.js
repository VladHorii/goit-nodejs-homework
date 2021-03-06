const { Contact } = require("../../models");

const getById = async (req, res) => {
  const foundContact = await Contact.find(
    { owner: req.user._id, _id: req.params.contactId },
    "_id name email phone favorite owner"
  );

  if (!foundContact) {
    const error = new Error("Not Found");
    error.status = 404;
    throw error;
  }

  res.json(foundContact);
};
module.exports = getById;
