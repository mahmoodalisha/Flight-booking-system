const Flight = require('../models/Flight');


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
  const { source, destination, date } = req.query; 
  try {
    
    const query = {};
    if (source) query.source = source;
    if (destination) query.destination = destination;
    if (date) {
      const searchDate = new Date(date);
      query.date = { $eq: searchDate }; 
    }

    
    const flights = await Flight.find(query);
    res.json(flights);
  } catch (error) {
    res.status(400).json({ error: 'Failed to fetch flights' });
  }
};

exports.deleteFlight = async (req, res) => {
  const { id } = req.params; // Get the flight ID from the request parameters
  try {
    const deletedFlight = await Flight.findByIdAndDelete(id);
    if (!deletedFlight) {
      return res.status(404).json({ error: 'Flight not found' });
    }
    res.status(200).json({ message: 'Flight deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete flight' });
  }
};
