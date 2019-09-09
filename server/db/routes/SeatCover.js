const handlers = require("../handlers/SeatCover");

module.exports.routes = app => {
  app.get("/seatcover", handlers.list);
  app.get("/seatcover/:id", handlers.get);
  app.post("/seatcover", handlers.create);
  app.put("/seatcover/:id", handlers.update);
  app.delete("/seatcover/:id", handlers.remove);
};
