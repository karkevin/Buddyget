const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const groupSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  users: {
    type: [{ type: Schema.Types.ObjectId, ref: "user" }]
  },
  transactions: {
    type: [{ type: Schema.Types.ObjectId, ref: "transaction" }]
  },
  totalExpenses: {
    type: Number,
    required: true,
    default: 0
  },
  register_date: {
    type: Date,
    default: Date.now()
  }
});

module.exports = Group = mongoose.model("group", groupSchema);
