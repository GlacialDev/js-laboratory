const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const host = process.env.DB_HOST;
const port = process.env.DB_PORT;
const database = process.env.DB_DATABASE;
const url = `mongodb://${username}:${password}@${host}:${port}/${database}`;
const modelsDirectory = path.join(process.cwd(), "db", "models");
const routesDirectory = path.join(process.cwd(), "db", "routes");
let models = {};

const init = app => {
  // добавляем модели в mongoose
  const schemaList = fs.readdirSync(modelsDirectory);
  for (const schema of schemaList) {
    const modelName = path.basename(schema, ".js");
    models[modelName] = require(path.join(modelsDirectory, modelName))(
      mongoose
    );
  }
  // console.log("Models loaded");

  // добавляем роуты в app
  const routesList = fs.readdirSync(routesDirectory);
  for (const route of routesList) {
    const fileName = path.basename(route, ".js");
    require(path.join(routesDirectory, fileName))(app);
  }
  // console.log("Routes loaded");

  // инициализируем подключение к базе данных
  const db = mongoose.createConnection(url, { useNewUrlParser: true });
  db.on("connected", () => console.log("Connected succesfully to url: " + url));
  db.on("disconnected", () => console.log("Connection disconnected"));
  db.on("error", err => console.log(err));
};

const model = name => {
  if (typeof models[name] == "undefined") {
    // eslint-disable-next-line
    throw "Model '" + name + "' is not exist";
  }
  return models[name];
};

module.exports.init = init;
module.exports.model = model;
