
const Customer = require('../models/Customer');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Flight = require('../models/Flight');


exports.register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    
    const existingCustomer = await Customer.findOne({ $or: [{ username }, { email }] });
    if (existingCustomer) {
      return res.status(400).json({ error: 'Username or email already in use' });
    }

    
    const hashedPassword = await bcrypt.hash(password, 10);
    const customer = new Customer({ username, email, password: hashedPassword });

    await customer.save();
    res.status(201).json({ message: 'Customer registered successfully' });
  } catch (error) {
    res.status(400).json({ error: 'User registration failed' });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const customer = await Customer.findOne({ username });

    if (customer && (await bcrypt.compare(password, customer.password))) {
      const token = jwt.sign({ id: customer._id }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });
      res.json({ token });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.bookFlight = async (req, res) => {
  const { flightId } = req.body;
  const customerId = req.user.id; 

  try {
    const flight = await Flight.findById(flightId);
    if (!flight) {
      return res.status(404).json({ error: 'Flight not found' });
    }

    const customer = await Customer.findById(customerId);
    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' });
    }

    // Add flight to customer's bookings
    customer.bookings.push(flightId);
    await customer.save();

    res.status(200).json({ message: 'Flight booked successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Failed to book flight' });
  }
};


exports.getBookings = async (req, res) => {
  const customerId = req.user.id;
  
  try {
    const customer = await Customer.findById(customerId).populate('bookings');
    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' });
    }
    
    res.status(200).json({ bookings: customer.bookings });
  } catch (error) {
    res.status(400).json({ error: 'Failed to fetch bookings' });
  }
};