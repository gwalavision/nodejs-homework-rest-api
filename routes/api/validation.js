const Joi = require("joi");

const schemaCreateContact = Joi.object({
  name: Joi.string()
    .alphanum()
    .regex(/^[A-Za-z\s]+$/)
    .min(3)
    .max(30)
    .required(),

  phone: Joi.string().required(),

  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "ua"] },
    })
    .required(),
  favorite: Joi.boolean(),
});

const schemaUpdateContact = Joi.object({
  name: Joi.string()
    .alphanum()
    .regex(/^[A-Za-z\s]+$/)
    .min(3)
    .max(30)
    .optional(),

  phone: Joi.string()
    .pattern(
      new RegExp("/^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$/im")
    )
    .optional(),

  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "ua"] },
    })
    .optional(),
  favorite: Joi.boolean().optional(),
});

const schemaUpdateStatus = Joi.object({
  favorite: Joi.boolean().required(),
});

const validate = async (schema, body, next) => {
  try {
    await schema.validateAsync(body);
    next();
  } catch (err) {
    const { message } = err;
    next({ status: 400, message });
  }
};

module.exports.validateCreateContact = (req, res, next) => {
  return validate(schemaCreateContact, req.body, next);
};

module.exports.validateUpdateContact = (req, res, next) => {
  return validate(schemaUpdateContact, req.body, next);
};

module.exports.validateUpdateStatus = (req, res, next) => {
  return validate(schemaUpdateStatus, req.body, next);
};
