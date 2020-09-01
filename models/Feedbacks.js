const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FeedbackSchema = new mongoose.Schema({
  request: {
    type: Schema.Types.ObjectId,
    ref: "requestpool",
    required: false,
  },
  reviewer: {
    type: Schema.Types.ObjectId,
    ref: "employee",
  },
  employee: {
    type: Schema.Types.ObjectId,
    ref: "employee",
  },
  summary: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  reviewerName: {
    type: String,
    required: true,
  },
  level: {
    type: Number,
    min: 0,
    max: 10,
    default: 0,
  },
});

module.exports = Feedback = mongoose.model("feedback", FeedbackSchema);
