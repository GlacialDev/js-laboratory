const Joi = require("joi");
const signUpSchema = require("../models/signUpSchema");
const utils = require("../utils/utils");

const signUp = async (req, res, db) => {
  const result = await Joi.validate(req.body, signUpSchema).catch(err => {
    console.log(err.details);
  });
  const { nickname, email, password, createdOn } = result;
  const isUserNicknameExists = utils.getValueFromDB(db, "users", { nickname });
  const isUserEmailExists = utils.getValueFromDB(db, "users", { email });
  const answer = { code: null };

  if (isUserNicknameExists) {
    answer.code = "1001";
  } else if (isUserEmailExists) {
    answer.code = "1002";
  } else {
    let hash = await utils.getHash(password);
    let id = utils.getId();
    utils.pushValueIntoDB(db, "users", {
      id,
      nickname,
      email,
      hash,
      createdOn
    });
    answer.code = "1000";
  }

  res.send({ answer });
};

module.exports = signUp;
