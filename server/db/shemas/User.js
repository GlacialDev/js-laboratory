// const Joi = require("joi");

// const signUpSchema = Joi.object().keys({
//   nickname: Joi.string()
//     .min(6)
//     .required()
//     .trim(),
//   email: Joi.string()
//     .email()
//     .required()
//     .trim(),
//   password: Joi.string()
//     .min(8)
//     .max(30)
//     .required()
//     .trim(),
//   repeatPassword: Joi.any().valid(Joi.ref("password")),
//   createdOn: Joi.date().default(new Date())
// });

// module.exports = signUpSchema;

var validator = require("validator");
var mongoose = require("mongoose");
var validate = require("mongoose-validator");
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

module.exports.User = new Schema({
  id: {
    type: ObjectId
  },
  nickname: {
    type: String,
    index: true,
    required: true,
    validate: validate({
      validator: "isLength",
      arguments: [6, undefined],
      message: "Nickname length should be minimum {ARGS[0]} symbols"
    })
  },
  email: {
    type: String,
    index: true,
    required: true,
    validate: { validator: validator.isEmail, message: "Invalid email." }
  },
  password: {
    type: String,
    required: true,
    validate: validate({
      validator: "isLength",
      arguments: [8, 30],
      message:
        "Password length should be between {ARGS[0]} and {ARGS[1]} symbols"
    })
  },
  createdOn: {
    type: Date
  }
});
