const express = require('express');
const { addFlight, getFlights, deleteFlight } = require('../controllers/flightController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, addFlight);
router.get('/', getFlights);
router.delete('/:id', authMiddleware, deleteFlight); 



module.exports = router;


/* 
POST http://localhost:5000/api/flights/book
{
  "flightId": "FLIGHT_ID_HERE", // Replace with the actual flight ID
  "seatsToBook": 2 // Number of seats the customer wants to book
}

*/