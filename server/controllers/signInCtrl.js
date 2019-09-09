const utils = require("../utils/utils");
// const passport = require("passport");
// const LocalStrategy = require("passport-local").Strategy;

const signIn = async (req, res, db) => {
  const { nickname, password } = req.body;
  const answer = {
    code: null,
    nickname: "",
    email: "",
    isAuth: false
  };
  const user = await utils.getValueFromDB(db, "users", { nickname });

  if (!user) {
    answer.code = "1003";
    res.status(404);
    res.send({ answer, err: null });
    return;
  }

  const isValidPassword = await utils.comparePasswords(password, user.hash);
  if (!isValidPassword) {
    answer.code = "1004";
    res.status(401);
    res.send({ answer, err: null });
  } else {
    answer.code = "success";
    answer.nickname = user.nickname;
    answer.email = user.email;
    answer.isAuth = true;

    await utils.updateItemInDB(db, "users", { id: user.id });

    res.status(200);
    res.send({ answer, err: null });
  }
};

module.exports = signIn;
