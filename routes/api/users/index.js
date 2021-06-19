const express = require("express");
const router = express.Router();
const {
  ctrlReg,
  ctrlLogin,
  ctrlLogout,
  ctrlCurrentUser,
  ctrlAvatars,
  ctrlVerify,
  ctrlRepeatSendingVerifyEmail,
} = require("../../../controllers/users");
const { validateUser } = require("./validation");
const guard = require("../../../helpers/guard");
const upload = require("../../../helpers/upload");

router.get("/verify/:token", ctrlVerify);
router.post("/verify", ctrlRepeatSendingVerifyEmail);
router.post("/register", validateUser, ctrlReg);
router.post("/login", validateUser, ctrlLogin);
router.post("/logout", guard, ctrlLogout);
router.get("/current", guard, ctrlCurrentUser);
router.patch("/avatars", [guard, upload.single("avatar")], ctrlAvatars);

module.exports = router;
