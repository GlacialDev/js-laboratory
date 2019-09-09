require("dotenv").config();
const express = require("express");
const path = require("path");
const app = express();
// const session = require("express-session");
const bodyParser = require("body-parser");
const low = require("lowdb");
const FileAsync = require("lowdb/adapters/FileAsync");
const adapter = new FileAsync("db.json");
const getDB = low(adapter);
const signIn = require("./controllers/signInCtrl");
// const signUp = require("./controllers/signUpCtrl");
const db = require("./db/db");
db.init();
const materialControllers = require("./db/routes/Material");
const seatCoverControllers = require("./db/routes/SeatCover");

app.use(express.static(path.join(process.cwd(), "../", "build")));
app.use(bodyParser.json());
// app.use(
//   session({
//     cookie: { maxAge: 86400000 },
//     // store: new MemoryStore({
//     //   checkPeriod: 86400000
//     // }),
//     secret: process.env.SESSION_SECRET
//   })
// );

materialControllers.routes(app);
seatCoverControllers.routes(app);

app.get("/*", (req, res) => {
  res.sendFile(path.join(process.cwd(), "../", "build", "index.html"));
});

getDB
  .then(db => {
    app.post("/api/user/signin", (req, res) => signIn(req, res, db));
    // app.post("/api/user/signup", (req, res) => signUp(req, res, db));
  })
  .then(() => {
    app.listen(9000);
  });
