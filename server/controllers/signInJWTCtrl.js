const utils = require("../utils/utils");
const jwt = require("jsonwebtoken");

const signInJWT = async (req, res, db) => {
  // console.log("signInJWT");
  // console.log(req.body.accessToken);
  const data = jwt.verify(req.body.accessToken, process.env.JWT_PRIVATE_KEY);
  // console.log("after jwt.verify");
  const user = await utils.getValueFromDB(db, "users", { id: data.id });
  const answer = {
    nickname: "",
    email: "",
    isAuth: false
  };

  if (user) {
    answer.nickname = user.nickname;
    answer.email = user.email;
    answer.isAuth = true;
  }

  res.send({ answer });
};

module.exports = signInJWT;
