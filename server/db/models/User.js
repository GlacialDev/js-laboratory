const path = require("path");
const UserSchema = require("../shemas/User");

module.exports = mongoose => {
  // Инициализируем модель с именем файла, в котором она находится
  return mongoose.model(path.basename(module.filename, ".js"), UserSchema);
};
