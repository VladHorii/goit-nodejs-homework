const express = require("express");
const { joiSchema } = require("../../models/user");
const { auth: ctrl } = require("../../controllers");
const {
  controllerWrapper,
  validation,
  authenticate,
  upload,
} = require("../../middlewares");

const router = express.Router();

router.post("/signup", validation(joiSchema), controllerWrapper(ctrl.signup));
router.post("/login", validation(joiSchema), controllerWrapper(ctrl.login));
router.get("/logout", authenticate, controllerWrapper(ctrl.logout));
router.get("/current", authenticate, controllerWrapper(ctrl.current));
router.patch("/", authenticate, controllerWrapper(ctrl.updateSubscription));
router.patch(
  "/avatars",
  authenticate,
  upload.single("photo"),
  controllerWrapper(ctrl.updateAvatar)
);
router.get("/verify/:verifyToken", controllerWrapper(ctrl.verify));
router.post("/verify", controllerWrapper(ctrl.verifyResend));

module.exports = router;
