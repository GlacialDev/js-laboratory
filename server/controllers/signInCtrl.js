const utils = require("../utils/utils");

const signIn = async (req, res, db) => {
  const { nickname, password } = req.body;

  const answer = { code: null };

  const user = utils.getValueFromDB(db, "users", { nickname });
  if (!user) {
    answer.code = "1004";
    res.send({ answer });
    return;
  }

  let isValidPassword = await utils.comparePasswords(password, user.hash);
  if (!isValidPassword) {
    answer.code = "1005";
    res.send({ answer });
    return;
  } else {
    answer.code = "1003";
    res.send({ answer });
  }
};

module.exports = signIn;
