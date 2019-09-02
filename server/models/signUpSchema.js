const Joi = require("joi");

const signUpSchema = Joi.object().keys({
  nickname: Joi.string()
    .min(6)
    .required()
    .trim(),
  email: Joi.string()
    .email()
    .required()
    .trim(),
  password: Joi.string()
    .min(8)
    .max(30)
    .required()
    .trim(),
  repeatPassword: Joi.any().valid(Joi.ref("password")),
  createdOn: Joi.date().default(new Date())
});

module.exports = signUpSchema;
