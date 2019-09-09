var mongoose = require("mongoose");
const path = require("path");

const SeatCoverSchema = require("../shemas/SeatCover");

module.exports = mongoose => {
  // Инициализируем модель с именем файла, в котором она находится
  return mongoose.model(path.basename(module.filename, ".js"), SeatCoverSchema);
};
