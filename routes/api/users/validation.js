const Joi = require("joi");
const { HTTPCode } = require("../../../helpers/constants");

const schemaUser = Joi.object({
  password: Joi.string().required(),

  email: Joi.string().email({
    minDomainSegments: 2,
  }),

  subscription: Joi.string(),
});

const validate = async (schema, body, next) => {
  try {
    await schema.validateAsync(body);
    next();
  } catch (err) {
    next({ status: HTTPCode.BAD_REQUEST, message: err.message });
  }
};

module.exports.validateUser = (req, _res, next) => {
  return validate(schemaUser, req.body, next);
};
