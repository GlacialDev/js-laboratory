require("dotenv").config();
const express = require("express");
const path = require("path");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const db = require("./db/db");

app.use(express.static(path.join(process.cwd(), "../", "build")));
app.use(cookieParser());
app.use(bodyParser.json());

db.init(app);

app.get("/*", (req, res) => {
  res.sendFile(path.join(process.cwd(), "../", "build", "index.html"));
});

app.listen(9000);
