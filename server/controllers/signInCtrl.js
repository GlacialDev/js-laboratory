const utils = require("../utils/utils");
const jwt = require("jsonwebtoken");

const signIn = async (req, res, db) => {
  const { nickname, password } = req.body;
  const answer = { code: null };
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
    const token = jwt.sign(
      {
        id: user.id
      },
      process.env.JWT_PRIVATE_KEY,
      {
        expiresIn: "1h"
      }
    );
    res.send({ answer, token });
  }
};

module.exports = signIn;
