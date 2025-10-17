const mongoose = require('mongoose');

const nomeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  year: { type: Number, required: true},
  genre: { type: String, required: true},
  watched: {type: Boolean, required: true},
  rating: { type: String, required: true },
  createdAt: {type: Date, default: Date.now}
}, {
  versionKey: false
});

module.exports = mongoose.models.Nome || mongoose.model('Nome', nomeSchema);