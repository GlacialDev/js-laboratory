require("dotenv").config();
const express = require("express");
const path = require("path");
const app = express();
const passport = require("passport");
const bodyParser = require("body-parser");
const db = require("./db/db");

app.use(express.static(path.join(process.cwd(), "../", "build")));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

db.init(app);

app.get("/*", (req, res) => {
  res.sendFile(path.join(process.cwd(), "../", "build", "index.html"));
});

app.listen(9000);
