const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const itemSchema = new Schema(
  {
    name: {
      type: String,
      lowercase: true,
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
    group: {
      type: [String]
    },
    date: {
      type: Date,
      default: Date.now()
    }
  },
  { database: "buddyget" }
);

module.exports = Item = mongoose.model("item", itemSchema);
