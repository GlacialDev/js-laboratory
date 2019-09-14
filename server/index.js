require("dotenv").config();
const express = require("express");
const path = require("path");
const app = express();
// const session = require("express-session");
const bodyParser = require("body-parser");
const db = require("./db/db");

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

db.init(app);

app.get("/*", (req, res) => {
  res.sendFile(path.join(process.cwd(), "../", "build", "index.html"));
});

app.listen(9000);
