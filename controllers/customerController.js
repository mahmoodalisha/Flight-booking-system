
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

exports.bookSeats = async (req, res) => {
  const { flightId, seatsToBook } = req.body; // Extract flight ID and number of seats to book from the request body
  const customerId = req.user.id; // Get the customer ID from the authenticated user

  try {
    // Debugging logs
    console.log('Flight ID:', flightId);  
    console.log('Seats to book:', seatsToBook);  
    console.log('Customer ID:', customerId);  

    // Find the flight by its ID
    const flight = await Flight.findById(flightId);
    
    if (!flight) {
      console.log('Flight not found');  // Debugging log
      return res.status(404).json({ error: 'Flight not found' });
    }

    // Debugging log for flight document
    console.log('Flight document:', flight);

    // Check if there are enough available seats
    if (flight.availableSeats < seatsToBook) {
      console.log('Not enough available seats');  // Debugging log
      return res.status(400).json({ error: 'Not enough available seats' });
    }

    // Update the available seats
    flight.availableSeats -= seatsToBook;

    await flight.save(); // Save the updated flight document
    console.log('Flight updated with available seats:', flight.availableSeats);  // Debugging log

    // Add the flight to the customer's bookings
    const customer = await Customer.findById(customerId);
    if (!customer) {
      console.log('Customer not found');  // Debugging log
      return res.status(404).json({ error: 'Customer not found' });
    }

    customer.bookings.push(flightId); // Add the flight to the customer's bookings
    await customer.save(); // Save the updated customer document
    console.log('Customer updated with booking');  // Debugging log

    res.status(200).json({ message: 'Seats booked successfully', availableSeats: flight.availableSeats });
  } catch (error) {
    // Error handling with detailed message
    console.error('Error during booking:', error);  // Output the full error for debugging
    res.status(500).json({ error: 'Failed to book seats', details: error.message });
  }
};

exports.cancelBooking = async (req, res) => {
  const customerId = req.user.id;  // Ensure this comes from the auth middleware
  const bookingId = req.params.bookingId;  // Booking ID from the request URL

  try {
    // Find the customer by their ID (from the token)
    const customer = await Customer.findById(customerId);
    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' });
    }

    // Find if the booking exists in the customer's bookings array
    const bookingExists = customer.bookings.some((id) => id.toString() === bookingId);
    if (!bookingExists) {
      return res.status(404).json({ error: 'Booking not found in customer records' });
    }

    // Remove the booking from the customer's bookings array
    customer.bookings = customer.bookings.filter((id) => id.toString() !== bookingId);
    
    // Save the updated customer record
    await customer.save();

    // Send success response
    res.status(200).json({ message: 'Booking canceled successfully' });
  } catch (error) {
    console.error(error); // Log any server errors for debugging
    res.status(500).json({ error: 'Server error, failed to cancel booking' });
  }
};