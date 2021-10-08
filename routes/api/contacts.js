const express = require("express");

const {
  updateById,
  add,
  getAll,
  getById,
  remove,
  updateFavoriteById,
} = require("../../controllers/contacts");
const router = express.Router();

router.get("/", getAll);

router.get("/:contactId", getById);

router.post("/", add);

router.delete("/:contactId", remove);

router.patch("/:contactId", updateById);

router.patch("/:contactId/favorite", updateFavoriteById);

module.exports = router;
