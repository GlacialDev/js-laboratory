const utils = require("../utils/utils");
const jwt = require("jsonwebtoken");

const refreshToken = async (req, res, db) => {
  const { refreshToken } = req.body;
  const data = jwt.verify(refreshToken, process.env.JWT_PRIVATE_KEY);
  const user = await utils.getValueFromDB(db, "users", { id: data.id });

  let newRefreshToken = "";
  let newAccessToken = "";
  if (user.refreshToken === refreshToken) {
    newRefreshToken = utils.getNewRefreshToken(user);
    newAccessToken = utils.getNewAccessToken(user);

    await utils.updateItemInDB(
      db,
      "users",
      { id: user.id },
      { refreshToken: newRefreshToken }
    );
  } else {
    // idk what to send
    // res.send({ isAuth: false })
  }

  res.send({ accessToken: newAccessToken, refreshToken: newRefreshToken });
};

module.exports = refreshToken;
