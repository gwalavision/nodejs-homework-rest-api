const express = require("express");
const router = express.Router();
const {
  ctrlReg,
  ctrlLogin,
  ctrlLogout,
  ctrlCurrentUser,
} = require("../../../controllers/users");
const { validateUser } = require("./validation");
const guard = require("../../../helpers/guard");

router.post("/register", validateUser, ctrlReg);
router.post("/login", validateUser, ctrlLogin);
router.post("/logout", guard, ctrlLogout);
router.get("/current", guard, ctrlCurrentUser);

module.exports = router;
