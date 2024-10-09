import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/customers/bookings', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBookings(response.data.bookings);
      } catch (err) {
        setError('Error fetching bookings');
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div>
      <h1>Your Previous Bookings</h1>
      {loading && <p>Loading bookings...</p>}
      {error && <p>{error}</p>}
      <ul>
        {bookings.map((booking) => (
          <li key={booking._id}>
            <p>
              Flight ID: {booking.flightId} <br />
              Flight Name: {booking.flightname} <br />
              Source: {booking.source} <br />
              Destination: {booking.destination} <br />
              Date: {new Date(booking.date).toLocaleDateString()}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Bookings;
