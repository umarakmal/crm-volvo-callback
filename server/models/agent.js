const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const agentSchema = new Schema(
  {
    // _id: mongoose.Schema.Types.ObjectId,
    mobile: {
      type: String,
    },
    queue: {
      type: String,
    },
    abandoned: {
      type: String,
    },
    disposition: {
      type: String,
    },
    first: {
      type: String,
    },
    second: {
      type: String,
    },
    third: {
      type: String,
    },
    fattempt: {
      type: String,
    },
    sattempt: {
      type: String,
    },
    tattempt: {
      type: String,
    },
    flag: {
      type: String,
      default: 0,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Agent", agentSchema);
