const modelName = "User";
const handlers = require("../../utils/crudHandlers")(modelName);
const db = require("../db");

const { list, get, update, remove } = handlers;

const create = (req, res, next) => {
  db.model(modelName).create(req.body, (err, data) => {
    if (err) {
      next(err);
    }
    res.send(data);
  });
};

module.exports = { list, get, create, update, remove };
