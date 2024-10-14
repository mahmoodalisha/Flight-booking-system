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

  const handleCancelBooking = async (bookingId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/customers/bookings/${bookingId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // Update the bookings state to remove the canceled booking
      setBookings((prevBookings) => prevBookings.filter((booking) => booking._id !== bookingId));
    } catch (err) {
      setError('Error canceling booking');
    }
  };

  return (
    <div>
      <h1>Your Previous Bookings</h1>
      {loading && <p>Loading bookings...</p>}
      {error && <p>{error}</p>}
      <ul>
        {bookings.map((booking) => (
          <li key={`${booking._id}-${booking.flightId}`}>
            <p>
              Flight ID: {booking.flightId} <br />
              Flight Name: {booking.flightname} <br />
              Source: {booking.source} <br />
              Destination: {booking.destination} <br />
              Date: {new Date(booking.date).toLocaleDateString()} <br />
              <button onClick={() => handleCancelBooking(booking._id)}>Cancel Booking</button>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Bookings;
