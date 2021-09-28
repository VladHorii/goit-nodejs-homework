const { nanoid } = require("nanoid");
const listContacts = require("./listContacts");
const updateContactList = require("./updateContactList");

const addContact = async (body) => {
  console.log(body);
  const contactsList = await listContacts();
  const newContact = { id: nanoid(), ...body };
  contactsList.push(newContact);

  await updateContactList(contactsList);
  return newContact;
};
module.exports = addContact;
