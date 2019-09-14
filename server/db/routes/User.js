const handlers = require("../handlers/User");

module.exports = app => {
  app.get("/api/user", handlers.list);
  app.get("/api/user/:id", handlers.get);
  app.post("/api/user", handlers.create);
  app.put("/api/user/:id", handlers.update);
  app.delete("/api/user/:id", handlers.remove);
};
