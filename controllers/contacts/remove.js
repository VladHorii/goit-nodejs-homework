const { Contact } = require("../../models");

const remove = async (req, res) => {
  const removeStatus = await Contact.findOneAndRemove({
    owner: req.user._id,
    _id: req.params.contactId,
  });

  if (removeStatus) {
    return res.json({ message: "contact deleted" });
  }
  const err = new Error("Not Found");
  err.status = 404;
  throw err;
};
module.exports = remove;
