require("dotenv").config();
const express = require("express");
const path = require("path");
const app = express();
const bodyParser = require("body-parser");
const low = require("lowdb");
const FileAsync = require("lowdb/adapters/FileAsync");
const adapter = new FileAsync("db.json");
const getDB = low(adapter);
const signIn = require("./controllers/signInCtrl");
const signUp = require("./controllers/signUpCtrl");
const signInJWT = require("./controllers/signInJWTCtrl");

app.use(express.static(path.join(process.cwd(), "../", "build")));
app.use(bodyParser.json());

app.get("/*", (req, res) => {
  res.sendFile(path.join(process.cwd(), "../", "build", "index.html"));
});

getDB
  .then(db => {
    app.post("/api/user/signin", (req, res) => signIn(req, res, db));
    app.post("/api/user/signin_jwt", (req, res) =>
      signInJWT(req, res, db).catch(err => res.send({ isAuth: false }))
    );
    app.post("/api/user/signup", (req, res) => signUp(req, res, db));
  })
  .then(() => {
    app.listen(9000);
  });
