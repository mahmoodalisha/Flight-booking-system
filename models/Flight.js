const mongoose = require('mongoose');

const flightSchema = new mongoose.Schema({
  flightname: { type: String, required: true },
  source: { type: String, required: true },
  destination: { type: String, required: true },
  departureTime: { type: Date, required: true },
  arrivalTime: { type: Date, required: true },
  date: { type: Date, required: true },
});

module.exports = mongoose.model('Flight', flightSchema);
