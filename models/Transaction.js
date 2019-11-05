const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const transactionSchema = new Schema({
  source: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true
  },
  destination: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true
  },
  money: {
    type: Number,
    default: 0
  }
});

module.exports = Transaction = mongoose.model("transaction", transactionSchema);
