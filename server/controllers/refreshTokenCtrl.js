const utils = require("../utils/utils");
const jwt = require("jsonwebtoken");

const refreshToken = async (req, res, db) => {
  const { refreshToken } = req.body;
  //   console.log("refreshToken");
  //   console.log(refreshToken);
  const data = jwt.verify(refreshToken, process.env.JWT_PRIVATE_KEY);
  //   console.log("after jwt.verify");
  let user = await utils.getValueFromDB(db, "users", { id: data.id });

  let newRefreshToken = "";
  let newAccessToken = "";
  if (user.refreshToken === refreshToken) {
    newRefreshToken = jwt.sign(
      {
        nickname: user.nickname,
        id: user.id
      },
      process.env.JWT_PRIVATE_KEY,
      {
        expiresIn: "30d"
      }
    );
    newAccessToken = jwt.sign(
      {
        nickname: user.nickname,
        id: user.id
      },
      process.env.JWT_PRIVATE_KEY,
      {
        expiresIn: "30m"
      }
    );

    await utils.updateItemInDB(db, "users", { id: user.id }, { refreshToken });
  } else {
    // idk what to send
    // res.send({ isAuth: false })
  }

  res.send({ accessToken: newAccessToken, refreshToken: newRefreshToken });
};

module.exports = refreshToken;
