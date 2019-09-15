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
            console.log("nickname doesn't exist");
            return done(null, false, {
              errors: { nickname: "nickname doesn't exist" }
            });
          }

          const isValidPassword = db
            .model(modelName)
            .authenticate(user, password);
          if (!isValidPassword) {
            console.log("password is invalid");
            return done(null, false, {
              errors: { password: "password is invalid" }
            });
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

const authenticate = (req, res, next) => {
  console.log(req.session.passport.user);
  console.log(req.user);
};

module.exports = { ...handlers, authenticate };
