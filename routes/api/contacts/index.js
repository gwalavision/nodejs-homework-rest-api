const express = require("express");
const router = express.Router();
const {
  validateCreateContact,
  validateUpdateContact,
  validateUpdateStatus,
} = require("./validation");

const {
  ctrlGetAll,
  ctrlGetById,
  ctrlCreateContact,
  ctrlUpdateContact,
  ctrlUpdateContactStatus,
  ctrlRemoveContact,
} = require("../../../controllers/contacts");

const guard = require("../../../helpers/guard");

router.get("/", guard, ctrlGetAll);

router.get("/:contactId", guard, ctrlGetById);

router.post("/", validateCreateContact, guard, ctrlCreateContact);

router.delete("/:contactId", guard, ctrlRemoveContact);

router.put("/:contactId", validateUpdateContact, guard, ctrlUpdateContact);

router.patch(
  "/:contactId/favorite",
  validateUpdateStatus,
  ctrlUpdateContactStatus
);

module.exports = router;
