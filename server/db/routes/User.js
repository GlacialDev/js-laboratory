const handlers = require("../handlers/User");
const passport = require("passport");

module.exports = app => {
  app.get("/api/user", handlers.list);
  app.get("/api/user/:id", handlers.get);
  app.post("/api/user", handlers.create);
  app.post(
    "/api/user/authenticate",
    passport.authenticate("local"),
    handlers.authenticate
  );
  app.put("/api/user/:id", handlers.update);
  app.delete("/api/user/:id", handlers.remove);
};
