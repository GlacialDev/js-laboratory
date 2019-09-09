var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var Material = require("./Material");

module.exports.SeatCover = new Schema({
  ItemName: { type: String, index: true },
  ItemId: ObjectId,
  Pattern: String,
  Categories: {
    year: { type: Number, index: true },
    make: { type: String, index: true },
    model: { type: String, index: true },
    body: { type: String, index: true }
  },
  Description: String,
  Specifications: String,
  Price: String,
  Cost: String,
  ImageUrl: String,
  Materials: [Material]
});
