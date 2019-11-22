const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const itemSchema = new Schema({
  buyer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true
  },
  location: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  buyerGroup: {
    type: [{ type: Schema.Types.ObjectId, ref: "user" }]
  },
  groupId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "group",
    required: true
  },
  date: {
    type: Date,
    default: Date.now()
  }
});

module.exports = Item = mongoose.model("item", itemSchema);
