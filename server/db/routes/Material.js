const handlers = require("../handlers/Material");

module.exports.routes = app => {
  app.get("/material", handlers.list);
  app.get("/material/:id", handlers.get);
  app.post("/material", handlers.create);
  app.put("/material/:id", handlers.update);
  app.delete("/material/:id", handlers.remove);
};
