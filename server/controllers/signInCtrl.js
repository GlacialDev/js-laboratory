const utils = require("../utils/utils");
const jwt = require("jsonwebtoken");

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
    res.send({ answer });
    return;
  }

  let isValidPassword = await utils.comparePasswords(password, user.hash);
  if (!isValidPassword) {
    answer.code = "1004";
    res.send({ answer });
  } else {
    answer.code = "success";
    answer.nickname = user.nickname;
    answer.email = user.email;
    answer.isAuth = true;
    const accessToken = jwt.sign(
      {
        nickname: user.nickname,
        id: user.id
      },
      process.env.JWT_PRIVATE_KEY,
      {
        expiresIn: "10s"
      }
    );
    const refreshToken = jwt.sign(
      {
        nickname: user.nickname,
        id: user.id
      },
      process.env.JWT_PRIVATE_KEY,
      {
        expiresIn: "1m"
      }
    );
    await utils.updateItemInDB(db, "users", { id: user.id }, { refreshToken });

    res.send({ answer, accessToken, refreshToken });
  }
};

module.exports = signIn;
