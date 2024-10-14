const express = require('express');
const { register, login, getBookings, bookSeats, cancelBooking } = require('../controllers/customerController'); 
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/register', register); 
router.post('/login', login); 
router.get('/bookings',authMiddleware,  getBookings);
router.post('/book', authMiddleware, bookSeats);
router.delete('/bookings/:bookingId', authMiddleware, cancelBooking);

module.exports = router;
