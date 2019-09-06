const utils = require("../utils/utils");
const jwt = require("jsonwebtoken");

const refreshToken = async (req, res, db) => {
  const { refreshToken } = req.body;
  let { header, payload } = utils.decodeJWT(refreshToken);
  console.log(payload);
  let data = null;
  let newRefreshToken = "";
  let newAccessToken = "";
  try {
    data = jwt.verify(refreshToken, process.env.JWT_PRIVATE_KEY);
  } catch (err) {}
  const user = await utils.getValueFromDB(db, "users", { id: payload.id });
  let refreshTokensMap = user.refreshTokensMap;

  let isTokenExistsInMap = user.refreshTokensMap.find(
    item => item === refreshToken
  );

  // if there was error cause of not valid token and data=null, we should kill this token in DB
  if (!data && isTokenExistsInMap) {
    console.log(refreshTokensMap);
    let index = refreshTokensMap.indexOf(refreshToken);
    refreshTokensMap.splice(index, 1);

    await utils.updateItemInDB(
      db,
      "users",
      { id: user.id },
      { refreshTokensMap }
    );

    res.send({
      answer: {
        accessToken: "",
        refreshToken: ""
      },
      err: null
    });
  }

  // if there was no error and old token is in db, we should replace old token with new one
  if (data && isTokenExistsInMap) {
    newRefreshToken = utils.getNewRefreshToken(user);
    newAccessToken = utils.getNewAccessToken(user);

    refreshTokensMap = refreshTokensMap.map(item => {
      if (item === refreshToken) {
        item = newRefreshToken;
      }
      return item;
    });

    await utils.updateItemInDB(
      db,
      "users",
      { id: user.id },
      { refreshTokensMap }
    );

    res.send({
      answer: { accessToken: newAccessToken, refreshToken: newRefreshToken },
      err: null
    });
  }

  // if there is no token at all in db, we shouldn't authorize
  if (!isTokenExistsInMap) {
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
