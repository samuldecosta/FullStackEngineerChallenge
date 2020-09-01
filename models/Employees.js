const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  designation: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    required: true,
  },
  domain: {
    type: String,
    required: true,
  },
  performance: {
    type: Number,
    min: 0,
    max: 10,
    default: 0,
  },
});

module.exports = Employee = mongoose.model("employee", EmployeeSchema);
