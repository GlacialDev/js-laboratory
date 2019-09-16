const modelName = "User";
const handlers = require("../../utils/crudHandlers")(modelName);
const db = require("../db");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const { list, get, update, remove } = handlers;

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

const create = (req, res, next) => {
  // if user exist, send error code
  db.model(modelName)
    .findOne({
      $or: [{ nickname: req.body.nickname }, { email: req.body.email }]
    })
    .then(user => {
      if (user.nickname === req.body.nickname) {
        res.status(302);
        res.send({
          code: "1001"
        });
      } else if (user.email === req.body.email) {
        res.status(302);
        res.send({
          code: "1002"
        });
      } else {
        res.status(500);
        res.send({
          code: "1000"
        });
      }
    })
    // if user doesn't exist, register new user
    .catch(err => {
      db.model(modelName).create(req.body, (err, data) => {
        if (err) {
          next(err);
        }
        res.status(201);
        res.send({ code: "1000" });
      });
    });
};

module.exports = { list, get, update, remove, create, authenticate };
