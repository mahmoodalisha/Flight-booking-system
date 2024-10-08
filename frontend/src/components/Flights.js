import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Flights = () => {
  const [flights, setFlights] = useState([]);

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/flights');
        console.log('Fetched flights:', response.data);
        setFlights(response.data);
      } catch (error) {
        console.error('Error fetching flights:', error);
      }
    };

    fetchFlights();
  }, []);

  const bookFlight = async (flightId) => {
    const token = localStorage.getItem('token');

    if (!token) {
      alert('You need to be logged in to book a flight.');
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/customers/book-flight', { flightId }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert('Flight booked successfully');
    } catch (error) {
      console.error('Error booking flight:', error);
      alert('Failed to book flight');
    }
  };

  return (
    <div>
      <h2>Available Flights</h2>
      <ul>
        {flights.map(flight => (
          <li key={flight._id}>
            <div>
              <p>{flight.source} to {flight.destination}</p>
              <p>Departure: {new Date(flight.departureTime).toLocaleString()}</p>
              <p>Arrival: {new Date(flight.arrivalTime).toLocaleString()}</p>
              <p>Date: {new Date(flight.date).toLocaleDateString()}</p>
              <button onClick={() => bookFlight(flight._id)}>Book Flight</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Flights;
