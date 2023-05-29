const mongoose = require("mongoose");

const exquisiteGame = new mongoose.Schema({
  gameID: String,
  authorID: String,
  sentences: Array,
  embedID: String,
  channelID: String,
  endDate: Number,
  oneTimePlay: Boolean,
  active: Boolean,
});

module.exports = mongoose.model("ExquisiteGame", exquisiteGame);
