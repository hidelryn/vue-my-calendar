const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const todoSchema = new Schema({
  message: String,
  year: Number,
  month: Number,
  day: Number,
  createAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model('todos', todoSchema);
