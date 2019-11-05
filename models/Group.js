const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { transactionSchema } = require("./Transaction");

const groupSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  users: {
    type: [{ type: Schema.Types.ObjectId, ref: "User" }]
  },
  transactions: {
    type: [{ type: Schema.Types.ObjectId, ref: "Transaction" }]
  },
  register_date: {
    type: Date,
    default: Date.now()
  }
});

module.exports = Group = mongoose.model("group", groupSchema);
