const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  year: { type: Number, required: true, min: 1800 },
  genre: { type: String, required: true, trim: true },
  watched: { type: Boolean, default: false },
  rating: { type: Number, required: true, min: 0, max: 10 },
  createdAt: { type: Date, default: Date.now }
}, {
  versionKey: false
});

module.exports = mongoose.models.Movie || mongoose.model('Movie', movieSchema);