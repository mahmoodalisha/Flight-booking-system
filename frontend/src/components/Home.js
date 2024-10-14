import React, { useState } from 'react'; 
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');
  const [seatsToBook, setSeatsToBook] = useState({}); // Track the number of seats to book for each flight
  const [sortOrder, setSortOrder] = useState(''); // Track sorting order
  const navigate = useNavigate();

  const fetchFlights = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/flights', {
        params: { source, destination, date },
      });

      // Get the day name from the selected date
      const selectedDate = new Date(date);
      const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const selectedDay = dayNames[selectedDate.getUTCDay()]; // Get the day of the week (Sunday to Saturday)

      // Filter flights based on whether they operate on the selected day
      const filteredFlights = response.data.filter(flight =>
        flight.flightDays.includes(selectedDay)
      );

      setFlights(filteredFlights);
    } catch (err) {
      setError('Error fetching flights');
    } finally {
      setLoading(false);
    }
  };

  // Function to sort flights
  const sortFlights = (order) => {
    const sortedFlights = [...flights].sort((a, b) => {
      return order === 'asc' ? a.pricePerSeat - b.pricePerSeat : b.pricePerSeat - a.pricePerSeat;
    });
    setFlights(sortedFlights);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchFlights();
  };

  // New booking function
  const handleBookSeats = async (flightId) => {
    try {
      const token = localStorage.getItem('token');
      const seats = seatsToBook[flightId] || 0; // Get the number of seats for the specific flight
      const response = await axios.post(
        'http://localhost:5000/api/customers/book',
        { flightId, seatsToBook: seats },  // Sending flightId and number of seats to book
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert(response.data.message);
    } catch (error) {
      alert('Failed to book seats');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleViewBookings = () => {
    navigate('/bookings'); 
  };

  // Handle change for seat selection
  const handleSeatsChange = (flightId, value) => {
    setSeatsToBook(prev => ({
      ...prev,
      [flightId]: Math.max(1, Math.min(value, flights.find(flight => flight._id === flightId)?.availableSeats || 1)), // Ensure it's within limits
    }));
  };

  return (
    <div>
      <h1>Welcome to the Flight Booking System</h1>
      <nav>
        <Link to="/login">
          <button>Login</button>
        </Link>
        <Link to="/register">
          <button>Register</button>
        </Link>
        <button onClick={handleLogout}>Logout</button>
      </nav>

      <form onSubmit={handleSearch}>
        <select value={source} onChange={(e) => setSource(e.target.value)} required>
          <option value="">Select Source</option>
          <option value="Delhi">Delhi</option>
          <option value="Mumbai">Mumbai</option>
          <option value="Bangalore">Bangalore</option>
          <option value="Kolkata">Kolkata</option>
          <option value="Chennai">Chennai</option>
          <option value="Hyderabad">Hyderabad</option>
        </select>

        <select value={destination} onChange={(e) => setDestination(e.target.value)} required>
          <option value="">Select Destination</option>
          <option value="Delhi">Delhi</option>
          <option value="Mumbai">Mumbai</option>
          <option value="Bangalore">Bangalore</option>
          <option value="Kolkata">Kolkata</option>
          <option value="Chennai">Chennai</option>
          <option value="Hyderabad">Hyderabad</option>
        </select>

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          placeholder="Flight Date"
          required
        />

        <button type="submit">Search Flights</button>
      </form>

      {/* Sort Buttons */}
      <div>
        <button onClick={() => sortFlights('asc')}>Sort by Price: Low to High</button>
        <button onClick={() => sortFlights('desc')}>Sort by Price: High to Low</button>
      </div>

      {loading && <p>Loading flights...</p>}
      {error && <p>{error}</p>}

      <ul>
  {flights.map((flight) => (
    <li key={flight._id}>
      <p>
        Flight: {flight.flightname} <br />
        {flight.source} to {flight.destination} <br />
        Departure: {new Date(flight.departureTime).toLocaleString()} <br />
        Arrival: {new Date(flight.arrivalTime).toLocaleString()} <br />
        Date: {new Date(flight.date).toLocaleDateString()} <br />
        Flight Days: {flight.flightDays.join(', ')} <br />
        Price per Seat: ₹{flight.pricePerSeat} <br />
        Total Seat Capacity: {flight.totalSeatCapacity} <br />
        Available Seats: {flight.availableSeats}
      </p>

      {/* Input for specifying number of seats */}
      <input
        type="number"
        min="1"
        max={flight.availableSeats}  // Limit to available seats
        value={seatsToBook[flight._id] || 1} // Default to 1 if not set
        onChange={(e) => handleSeatsChange(flight._id, e.target.value)}
        placeholder="Seats to Book"
        required
        disabled={flight.availableSeats === 0} // Disable input if no seats are available
      />

      {/* Book Seats button */}
      <button
        onClick={() => handleBookSeats(flight._id)}
        disabled={flight.availableSeats === 0} // Disable button if no seats are available
      >
        {flight.availableSeats === 0 ? 'Fully Booked' : 'Book Seats'}
      </button>
    </li>
  ))}
</ul>


      <button onClick={handleViewBookings}>View Your Bookings</button>
    </div>
  );
};

export default Home;
