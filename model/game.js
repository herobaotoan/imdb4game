const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema({
  name: { type: String, default: null },
  genre: { type: String, default: null },
  developer: { type: String, default: null },
  platform: { type: String, default: null },
  img: { type: String, default: null },
  rating: {type: Array, default: []}
});


module.exports = mongoose.model("game", gameSchema);