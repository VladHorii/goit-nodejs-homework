const fs = require("fs/promises");
const path = require("path");

const filePath = path.join(__dirname, "contacts.json");

const updatedContactList = async (newContactsList) => {
  await fs.writeFile(filePath, JSON.stringify(newContactsList));
};

module.exports = updatedContactList;
