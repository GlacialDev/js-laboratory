const handlers = require("../handlers/User");
const passport = require("passport");

module.exports = app => {
  app.get("/api/user", handlers.list);
  app.get("/api/user/logout", handlers.logout);
  app.get("/api/user/session_authenticate", handlers.sessionAuthenticate);
  app.get("/api/user/:id", handlers.get);
  app.post("/api/user", handlers.create);
  app.post("/api/user/authenticate", (req, res, next) =>
    passport.authenticate("local", (err, user, next) => {
      handlers.authenticate(req, res, err, user);
    })(req, res, next)
  );
  app.put("/api/user/:id", handlers.update);
  app.delete("/api/user/:id", handlers.remove);
};
