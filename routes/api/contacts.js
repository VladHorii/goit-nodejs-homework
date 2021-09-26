const express = require("express");
const contactsFn = require("../../model/contacts/index");
const contactSchema = require("../../schemas/contact");
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const contactslist = await contactsFn.listContacts();
    res.json(contactslist);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const foundContact = await contactsFn.getContactById(req.params.contactId);

    if (!foundContact) {
      const error = new Error("Not Found");
      error.status = 404;
      throw error;
    }

    res.json(foundContact);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.query);
    if (error) {
      const err = new Error(error.message);
      err.status = 400;
      throw err;
    }
    const newContact = await contactsFn.addContact(req.query);
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.query);
    if (error) {
      const err = new Error(error.message);
      err.status = 400;
      throw err;
    }

    const removeStatus = await contactsFn.removeContact(req.params.contactId);
    if (removeStatus) {
      return res.json({ message: "contact deleted" });
    }
    const err = new Error("Not Found");
    err.status = 404;
    throw err;
  } catch (error) {
    next(error);
  }
});

router.patch("/:contactId", async (req, res, next) => {
  try {
    const updateStatus = await contactsFn.updateContact(
      req.params.contactId,
      req.query
    );
    if (updateStatus) {
      res.json(updateStatus);
    }
    const error = new Error("Not Found");
    error.status = 404;
    throw error;
  } catch (error) {
    next(error);
  }
});

module.exports = router;
