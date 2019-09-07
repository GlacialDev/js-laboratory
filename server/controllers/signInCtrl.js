const utils = require("../utils/utils");

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
    const refreshToken = utils.getNewRefreshToken(user);
    const accessToken = utils.getNewAccessToken(user);
    let refreshTokensMap = user.refreshTokensMap;
    refreshTokensMap.push(refreshToken);
    await utils.updateItemInDB(
      db,
      "users",
      { id: user.id },
      { refreshTokensMap }
    );

    res.status(200);
    res.send({ answer, accessToken, refreshToken, err: null });
  }
};

module.exports = signIn;
