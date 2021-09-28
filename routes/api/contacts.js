const express = require("express");

const {
  updateById,
  add,
  getAll,
  getById,
  remove,
} = require("../../controllers/contacts");
const router = express.Router();

router.get("/", getAll);

router.get("/:contactId", getById);

router.post("/", add);

router.delete("/:contactId", remove);

router.patch("/:contactId", updateById);

module.exports = router;
