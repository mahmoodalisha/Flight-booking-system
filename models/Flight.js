const mongoose = require('mongoose');

const flightSchema = new mongoose.Schema({
  flightname: { type: String, required: true },
  source: { type: String, required: true },
  destination: { type: String, required: true },
  departureTime: { type: Date, required: true },
  arrivalTime: { type: Date, required: true },
  date: { type: Date, required: true },
  flightDays: { 
    type: [String], 
    enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    required: true 
  },
  pricePerSeat: { type: Number, required: true }, 
  totalSeatCapacity: { type: Number, required: true },
  availableSeats: { type: Number, required: true }, // New field for available seats
});

module.exports = mongoose.model('Flight', flightSchema);
