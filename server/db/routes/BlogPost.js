const handlers = require("../handlers/User");

module.exports = app => {
  app.get("/api/blogposts", handlers.list);
  app.get("/api/blogposts/:id", handlers.get);
  app.post("/api/blogposts", handlers.create);
  app.put("/api/blogposts", handlers.update);
  app.delete("/api/blogposts", handlers.remove);
};
