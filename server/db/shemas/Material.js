var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

module.exports.Material = new Schema({
  name: { type: String, index: true },
  id: ObjectId,
  materialId: String,
  surcharge: String,
  colors: {
    colorName: String,
    colorId: String,
    surcharge: Number
  }
});
