const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RequestPoolSchema = new mongoose.Schema({
  reqby: {
    type: Schema.Types.ObjectId,
    ref: "employee",
    required: true,
  },
  reqfrom: {
    type: Schema.Types.ObjectId,
    ref: "employee",
    required: true,
  },
  reqfor: {
    type: Schema.Types.ObjectId,
    ref: "employee",
    required: true,
  },
  requester: {
    type: String,
    required: true,
  },
  reviewer: {
    type: String,
    required: true,
  },
  candidate: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  completed: {
    type: Boolean,
    default: false,
  },
  rejected: {
    type: Boolean,
    default: false,
  },
  comment: {
    type: String,
  },
});

module.exports = RequestPool = mongoose.model("requestpool", RequestPoolSchema);
