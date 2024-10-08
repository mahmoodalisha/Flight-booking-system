import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const navigate = useNavigate();

  const fetchFlights = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:5000/api/flights`, {
        params: { source, destination },
      });
      setFlights(response.data);
    } catch (err) {
      setError('Error fetching flights');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchFlights();
  };

  const handleBookFlight = async (flightId) => {
    try {
      const token = localStorage.getItem('token'); 
      const response = await axios.post(
        'http://localhost:5000/api/customers/book-flight',
        { flightId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert(response.data.message);
    } catch (error) {
      alert('Failed to book flight');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); 
    navigate('/login'); 
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
          <option value="Chennai">Chennai</option>
          <option value="Hyderabad">Hyderabad</option>
          <option value="Kolkata">Kolkata</option>
        </select>
        <select value={destination} onChange={(e) => setDestination(e.target.value)} required>
          <option value="">Select Destination</option>
          <option value="Delhi">Delhi</option>
          <option value="Mumbai">Mumbai</option>
          <option value="Bangalore">Bangalore</option>
          <option value="Chennai">Chennai</option>
          <option value="Hyderabad">Hyderabad</option>
          <option value="Kolkata">Kolkata</option>
        </select>
        <button type="submit">Search Flights</button>
      </form>

      {loading && <p>Loading flights...</p>}
      {error && <p>{error}</p>}
      <ul>
        {flights.map((flight) => (
          <li key={flight._id}>
            <p>
              {flight.source} to {flight.destination} <br />
              Departure: {new Date(flight.departureTime).toLocaleString()} <br />
              Arrival: {new Date(flight.arrivalTime).toLocaleString()} <br />
              Date: {new Date(flight.date).toLocaleDateString()}
            </p>
            <button onClick={() => handleBookFlight(flight._id)}>Book Flight</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
