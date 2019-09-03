const utils = require("../utils/utils");
const jwt = require("jsonwebtoken");

const signInJWT = async (req, res, db) => {
  const data = jwt.verify(req.body.token, process.env.JWT_PRIVATE_KEY);
  const user = await utils.getValueFromDB(db, "users", { id: data.id });
  const answer = { isAuth: false };

  if (user) {
    answer.isAuth = true;
  }

  res.send({ answer });
};

module.exports = signInJWT;
