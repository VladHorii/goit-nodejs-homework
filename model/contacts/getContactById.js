const listContacts = require("./listContacts");

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const foundContact = contacts.find(
    ({ id }) => String(id) === String(contactId)
  );
  return foundContact;
};

module.exports = getContactById;
