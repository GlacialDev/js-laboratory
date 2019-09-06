const utils = require("../utils/utils");
const jwt = require("jsonwebtoken");

const signInJWT = async (req, res, db) => {
  const answer = {
    nickname: "",
    email: "",
    isAuth: false
  };
  let data = null;

  try {
    data = jwt.verify(req.body.accessToken, process.env.JWT_PRIVATE_KEY);
  } catch (err) {
    res.send({
      answer,
      err
    });
    return;
  }

  const user = await utils.getValueFromDB(db, "users", { id: data.id });

  if (user) {
    answer.nickname = user.nickname;
    answer.email = user.email;
    answer.isAuth = true;
  }

  res.send({ answer, err: null });
};

module.exports = signInJWT;
