//
//
//
const express = require("express");
const { joiSchema } = require("../../models/contact");
const { contacts: ctrl } = require("../../controllers");
const {
  controllerWrapper,
  validation,
  authenticate,
} = require("../../middlewares");

const router = express.Router();

router.get("/", authenticate, controllerWrapper(ctrl.getAll));
router.get("/:contactId", authenticate, controllerWrapper(ctrl.getById));
router.post(
  "/",
  authenticate,
  validation(joiSchema),
  controllerWrapper(ctrl.add)
);
router.delete(
  "/:contactId",
  authenticate,
  validation(joiSchema),
  controllerWrapper(ctrl.remove)
);
router.patch(
  "/:contactId",
  authenticate,
  validation(joiSchema),
  controllerWrapper(ctrl.updateById)
);
router.patch(
  "/:contactId/favorite",
  authenticate,
  controllerWrapper(ctrl.updateFavoriteById)
);

module.exports = router;
