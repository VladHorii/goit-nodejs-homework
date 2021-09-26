const listContacts = require("./listContacts");
const updateContactList = require("./updateContactList");

const removeContact = async (contactId) => {
  const contactsList = await listContacts();
  const idx = contactsList.findIndex(
    ({ id }) => String(id) === String(contactId)
  );
  if (idx === -1) {
    console.log("noo");
    return null;
  }
  contactsList.splice(idx, 1);
  await updateContactList(contactsList);
  return "Success remove";
};
module.exports = removeContact;
