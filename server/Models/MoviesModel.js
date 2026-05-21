
const mongoose = require("mongoose")

const MovieSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String },
  releaseDate: { type: Date, required: true },
  duration: { type: Number, required: true },
  genre: { type: String },
  posterUrl: { type: String },
  createdAt: { type: Date, default: Date.now }
})

const MovieModel = mongoose.model('Movies', MovieSchema)

module.exports = MovieModel;