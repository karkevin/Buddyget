const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const transactionSchema = new Schema({
  source: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  destination: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  money: {
    type: Number,
    default: 0
  }
});

module.exports = Transaction = mongoose.model("transaction", transactionSchema);
