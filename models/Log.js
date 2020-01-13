const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LogSchema = new Schema(
  {
    description: {
      type: String,
      required: true
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
  },
  { capped: { size: 10e6, max: 100, autoIndexId: true } }
);

module.exports = Log = mongoose.model("Log", LogSchema);
