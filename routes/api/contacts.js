const express = require("express");
const router = express.Router();
const contactServices = require("../../model/index.js");
const {
  validateCreateContact,
  validateUpdateContact,
} = require("./validation");

router.get("/", async (_, res, next) => {
  try {
    const contacts = await contactServices.listContacts();
    return res.status(200).json({
      status: "success",
      code: 200,
      data: { contacts },
    });
  } catch (e) {
    next(e);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const contact = await contactServices.getContactById(req.params.contactId);
    if (contact) {
      return res
        .status(200)
        .json({ status: "success", code: "200", data: { contact } });
    } else {
      return res.status(404).json({
        status: "error",
        code: "404",
        message: "Not found",
      });
    }
  } catch (error) {
    next(error);
  }
});

router.post("/", validateCreateContact, async (req, res, next) => {
  try {
    if (
      req.body.hasOwnProperty("name") &
      req.body.hasOwnProperty("phone") &
      req.body.hasOwnProperty("email")
    ) {
      const contact = await contactServices.addContact(req.body);
      return res
        .status(201)
        .json({ status: "success", code: "201", data: { contact } });
    } else {
      return res.status(400).json({
        status: "error",
        code: "400",
        message: "missing required name field",
      });
    }
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const contact = await contactServices.removeContact(req.params.contactId);
    if (contact) {
      return res
        .status(200)
        .json({ status: "success", code: "200", message: "contact deleted" });
    } else {
      return res.status(404).json({
        status: "error",
        code: "404",
        message: "Not found",
      });
    }
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", validateUpdateContact, async (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({
      status: "error",
      code: "400",
      message: "missing fields",
    });
  } else {
    const contact = await contactServices.updateContact(
      req.params.contactId,
      req.body
    );
    try {
      if (contact) {
        return res
          .status(201)
          .json({ status: "success", code: "201", data: { contact } });
      } else {
        return res.status(404).json({
          status: "error",
          code: "404",
          message: "Not found",
        });
      }
    } catch (error) {
      next(error);
    }
  }
});

module.exports = router;
