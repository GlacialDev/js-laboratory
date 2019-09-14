const mongoose = require("mongoose");
const db = require("../db/db");

module.exports = modelName => {
  const list = (req, res, next) => {
    db.model(modelName).find({}, (err, data) => {
      if (err) next(err);
      res.send(data);
    });
  };

  const get = (req, res, next) => {
    try {
      var id = mongoose.Types.ObjectId(req.params.id);
    } catch (e) {
      res.send(400);
    }

    db.model(modelName).find({ _id: id }, (err, data) => {
      if (err) next(err);
      if (data) {
        res.send(data);
      } else {
        res.send(404);
      }
    });
  };

  const create = (req, res, next) => {
    db.model(modelName).create(req.body, (err, data) => {
      if (err) {
        next(err);
      }
      res.send(data);
    });
  };

  const update = (req, res, next) => {
    try {
      var id = mongoose.Types.ObjectId(req.params.id);
    } catch (e) {
      res.send(400);
    }

    db.model(modelName).update(
      { _id: id },
      { $set: req.body },
      (err, numberAffected, data) => {
        if (err) next(err);

        if (numberAffected) {
          res.send(200);
        } else {
          res.send(404);
        }
      }
    );
  };

  const remove = (req, res, next) => {
    try {
      var id = mongoose.Types.ObjectId(req.params.id);
    } catch (e) {
      res.send(400);
    }

    db.model(modelName).deleteOne({ _id: id }, (err, data) => {
      if (err) next(err);
      res.send(data ? req.params.id : 404);
    });
  };

  return {
    list,
    get,
    create,
    update,
    remove
  };
};
