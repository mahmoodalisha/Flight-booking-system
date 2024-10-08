const Flight = require('../models/Flight');

// Add Flight
exports.addFlight = async (req, res) => {
  const flight = new Flight(req.body);
  try {
    await flight.save();
    res.status(201).json(flight);
  } catch (error) {
    res.status(400).json({ error: 'Failed to add flight' });
  }
};


exports.getFlights = async (req, res) => {
  const { source, destination } = req.query;
  try {
    const flights = await Flight.find({ source, destination });
    res.json(flights);
  } catch (error) {
    res.status(400).json({ error: 'Failed to fetch flights' });
  }
};
