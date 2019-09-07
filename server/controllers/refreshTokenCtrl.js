const utils = require("../utils/utils");
const jwt = require("jsonwebtoken");

const refreshToken = async (req, res, db) => {
  const { refreshToken } = req.body;
  let { payload } = utils.decodeJWT(refreshToken);
  const user = await utils.getValueFromDB(db, "users", { id: payload.id });
  let refreshTokensMap = user.refreshTokensMap;
  let oldTokenIndex = refreshTokensMap.indexOf(refreshToken);
  let data = null;
  let newRefreshToken = "";
  let newAccessToken = "";
  try {
    data = jwt.verify(refreshToken, process.env.JWT_PRIVATE_KEY);
  } catch (err) {
    // if there was error cause of not valid token, we should kill this token in DB
    if (oldTokenIndex > -1) {
      refreshTokensMap.splice(oldTokenIndex, 1);

      await utils.updateItemInDB(
        db,
        "users",
        { id: user.id },
        { refreshTokensMap }
      );

      res.status(401);
      res.send({
        answer: {
          accessToken: "",
          refreshToken: ""
        },
        err: null
      });
    }
    return;
  }

  // if there was no error and old token is in db, we should replace old token with new one
  if (oldTokenIndex > -1) {
    newRefreshToken = utils.getNewRefreshToken(user);
    newAccessToken = utils.getNewAccessToken(user);

    refreshTokensMap.splice(oldTokenIndex, 1, newRefreshToken);

    await utils.updateItemInDB(
      db,
      "users",
      { id: user.id },
      { refreshTokensMap }
    );

    res.status(200);
    res.send({
      answer: { accessToken: newAccessToken, refreshToken: newRefreshToken },
      err: null
    });
  }

  // if there is no token at all in db, we shouldn't authorize
  if (oldTokenIndex < 0) {
    res.status(404);
    res.send({
      answer: {
        accessToken: "",
        refreshToken: ""
      },
      err: null
    });
  }
};

module.exports = refreshToken;
