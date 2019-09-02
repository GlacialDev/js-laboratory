const Joi = require("joi");
const signUpSchema = require("../models/signUpSchema");

const signUp = async (req, res, db) => {
  const result = await Joi.validate(req.body, signUpSchema).catch(err => {
    console.log(err.details);
  });
  const { nickname, email } = result;

  const isUserNicknameExists = db
    .get("users")
    .find({ nickname })
    .value();
  const isUserEmailExists = db
    .get("users")
    .find({ email })
    .value();

  let answer = {
    code: null
  };
  if (isUserNicknameExists) {
    answer.code = "1001";
  } else if (isUserEmailExists) {
    answer.code = "1002";
  } else {
    await db
      .get("users")
      .push(result)
      .write();
    answer.code = "1000";
  }

  res.send({ answer });
};

module.exports = signUp;
