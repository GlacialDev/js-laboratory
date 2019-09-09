const handlers = require("../handlers/User");

module.exports = app => {
  app.get("/user", handlers.list);
  app.get("/user/:id", handlers.get);
  app.post("/user", handlers.create);
  app.put("/user/:id", handlers.update);
  app.delete("/user/:id", handlers.remove);
};
