const listContacts = require("./listContacts");
const updateContactList = require("./updateContactList");

const updateContact = async (contactId, body) => {
  const contactsList = await listContacts();
  const idx = contactsList.findIndex(
    ({ id }) => String(id) === String(contactId)
  );
  if (idx === -1) {
    return null;
  }
  const updatedContact = { ...contactsList[idx], ...body };
  contactsList[idx] = updatedContact;

  await updateContactList(contactsList);

  return updatedContact;
};
module.exports = updateContact;
