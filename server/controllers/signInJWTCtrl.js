const utils = require("../utils/utils");
const jwt = require("jsonwebtoken");

const signInJWT = async (req, res, db) => {
  const { accessToken } = req.body;
  const { payload } = utils.decodeJWT(accessToken);
  const user = await utils.getValueFromDB(db, "users", { id: payload.id });
  const answer = {
    nickname: "",
    email: "",
    isAuth: false
  };
  let data = null;

  try {
    data = jwt.verify(accessToken, process.env.JWT_PRIVATE_KEY);
  } catch (err) {
    res.status(401);
    res.send({
      answer,
      err
    });
    return;
  }

  if (!user) {
    res.status(404);
    res.send({ answer, err: null });
  }

  answer.nickname = user.nickname;
  answer.email = user.email;
  answer.isAuth = true;
  res.status(200);
  res.send({ answer, err: null });
};

module.exports = signInJWT;
