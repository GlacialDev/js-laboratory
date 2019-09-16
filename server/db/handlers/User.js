const modelName = "User";
const handlers = require("../../utils/crudHandlers")(modelName);
const db = require("../db");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

passport.use(
  new LocalStrategy(
    {
      usernameField: "nickname",
      passwordField: "password"
    },
    (nickname, password, done) => {
      console.log(nickname, password);
      db.model(modelName)
        .findOne({ nickname })
        .then(user => {
          if (!user) {
            // nickname doesn't exist;
            return done({ code: "1003" }, false);
          }

          const isValidPassword = db
            .model(modelName)
            .authenticate(user, password);
          if (!isValidPassword) {
            // password is invalid;
            return done({ code: "1004" }, false);
          }

          passport.serializeUser(function(user, done) {
            done(null, user.nickname);
          });
          passport.deserializeUser(function(id, done) {
            done(null, user);
          });

          return done(null, user);
        })
        .catch(done);
    }
  )
);

const authenticate = (req, res, err, user) => {
  if (err) {
    res.status(401);
    res.send({ data: null, code: err.code });
  }
  if (user) {
    res.status(200);
    res.send({
      data: { nickname: user.nickname, email: user.email, isAuth: true },
      code: "success"
    });
  }
};

module.exports = { ...handlers, authenticate };
