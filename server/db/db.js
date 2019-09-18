const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const passport = require("passport");
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
  const modelsList = fs.readdirSync(modelsDirectory);
  for (const model of modelsList) {
    const modelName = path.basename(model, ".js");
    models[modelName] = require(path.join(modelsDirectory, modelName))(
      mongoose
    );
  }

  // инициализируем подключение к базе данных
  mongoose.connect(url, {
    useNewUrlParser: true,
    useCreateIndex: true
  });
  const conn = mongoose.connection;
  conn.on("open", () => console.log("Open connection: " + url));
  conn.on("connected", () => console.log("Connected: " + url));
  conn.on("disconnected", () => console.log("Disconnected: " + url));
  conn.on("error", err => console.error("Error: " + err));

  // инициализируем запись сессий в базу данных
  app.use(
    session({
      cookie: { secure: false, maxAge: 60 * 60 * 1000 },
      store: new MongoStore({
        mongooseConnection: conn,
        checkPeriod: 60 * 60 * 1000
      }),
      secret: process.env.SESSION_SECRET,
      saveUninitialized: false,
      resave: false
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());

  // добавляем роуты в app (в самом конце, т.к. иначе не применятся мидлвэры вроде сессий)
  const routesList = fs.readdirSync(routesDirectory);
  for (const route of routesList) {
    const fileName = path.basename(route, ".js");
    require(path.join(routesDirectory, fileName))(app);
  }
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
