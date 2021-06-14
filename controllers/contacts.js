const contactServices = require("../model/contacts");
const { HTTPCode } = require("../helpers/constants");

const ctrlGetAll = async (req, res, next) => {
  try {
    const userId = await req.user.id;
    const contacts = await contactServices.listContacts(userId);
    return res.status(HTTPCode.OK).json({
      status: "success",
      code: HTTPCode.OK,
      data: { contacts },
    });
  } catch (e) {
    next(e);
  }
};

const ctrlGetById = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const contact = await contactServices.getContactById(
      userId,
      req.params.contactId
    );
    if (contact) {
      return res
        .status(HTTPCode.OK)
        .json({ status: "success", code: HTTPCode.OK, data: { contact } });
    } else {
      return res.status(HTTPCode.NOT_FOUND).json({
        status: "error",
        code: HTTPCode.NOT_FOUND,
        message: "Not found",
      });
    }
  } catch (error) {
    next(error);
  }
};

const ctrlCreateContact = async (req, res, next) => {
  try {
    const userId = await req.user.id;
    if (req.body.name && req.body.phone && req.body.email) {
      const contact = await contactServices.addContact({
        owner: userId,
        ...req.body,
      });
      return res
        .status(HTTPCode.CREATED)
        .json({ status: "success", code: HTTPCode.CREATED, data: { contact } });
    } else {
      return res.status(HTTPCode.BAD_REQUEST).json({
        status: "error",
        code: HTTPCode.BAD_REQUEST,
        message: "missing required name field",
      });
    }
  } catch (error) {
    next(error);
  }
};

const ctrlUpdateContact = async (req, res, next) => {
  const userId = req.user.id;
  if (Object.keys(req.body).length === 0) {
    return res.status(HTTPCode.BAD_REQUEST).json({
      status: "error",
      code: HTTPCode.BAD_REQUEST,
      message: "missing fields",
    });
  } else {
    const contact = await contactServices.updateContact(
      userId,
      req.params.contactId,
      req.body
    );
    try {
      if (contact) {
        return res.status(HTTPCode.CREATED).json({
          status: "success",
          code: HTTPCode.CREATED,
          data: { contact },
        });
      } else {
        return res.status(HTTPCode.NOT_FOUND).json({
          status: "error",
          code: HTTPCode.NOT_FOUND,
          message: "Not found",
        });
      }
    } catch (error) {
      next(error);
    }
  }
};

const ctrlUpdateContactStatus = async (req, res, next) => {
  const userId = req.user.id;
  if (!Object.keys(req.body).includes("favorite")) {
    return res.status(HTTPCode.BAD_REQUEST).json({
      status: "error",
      code: HTTPCode.BAD_REQUEST,
      message: "missing field favorite",
    });
  } else {
    console.log(req.body);
    const contact = await contactServices.updateContact(
      userId,
      req.params.contactId,
      req.body
    );
    try {
      if (contact) {
        return res
          .status(HTTPCode.OK)
          .json({ status: "success", code: HTTPCode.OK, data: { contact } });
      } else {
        return res.status(HTTPCode.NOT_FOUND).json({
          status: "error",
          code: HTTPCode.NOT_FOUND,
          message: "Not found",
        });
      }
    } catch (error) {
      next(error);
    }
  }
};

const ctrlRemoveContact = async (req, res, next) => {
  const userId = req.user.id;
  try {
    const contact = await contactServices.removeContact(
      userId,
      req.params.contactId
    );
    if (contact) {
      return res.status(HTTPCode.OK).json({
        status: "success",
        code: HTTPCode.OK,
        message: "contact deleted",
      });
    } else {
      return res.status(HTTPCode.NOT_FOUND).json({
        status: "error",
        code: HTTPCode.NOT_FOUND,
        message: "Not found",
      });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  ctrlGetAll,
  ctrlGetById,
  ctrlCreateContact,
  ctrlUpdateContact,
  ctrlUpdateContactStatus,
  ctrlRemoveContact,
};
