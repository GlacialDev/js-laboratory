const express = require("express");
const path = require("path");
const app = express();
const bodyParser = require("body-parser");

app.use(express.static(path.join(process.cwd(), "../", "build")));
app.use(bodyParser.json());

app.post("/api/user/create", (req, res) => {
  console.log(req.body);
  res.send({ meow: "meow" });
});

app.get("/*", (req, res) => {
  res.sendFile(path.join(process.cwd(), "../", "build", "index.html"));
});

app.listen(9000);
