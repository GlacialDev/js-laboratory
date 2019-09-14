const path = require("path");

// Инициализируем модель с именем файла, в котором она находится
module.exports = mongoose => {
  const schema = require("../shemas/User")(mongoose);
  return mongoose.model(path.basename(module.filename, ".js"), schema);
};
