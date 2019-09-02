const express = require("express");
const path = require("path");
const app = express();
const bodyParser = require("body-parser");

app.use(express.static(path.join(process.cwd(), "../", "build")));
app.use(bodyParser.json());

app.post("/api/user/create", (req, res) => {
  // server codes
  // 1000 ok
  // 1001 nickname
  // 1002 email
  // 1003 another error
  res.send({
    answer: {
      code: "1000"
    }
  });
});

app.get("/*", (req, res) => {
  res.sendFile(path.join(process.cwd(), "../", "build", "index.html"));
});

app.listen(9000);
