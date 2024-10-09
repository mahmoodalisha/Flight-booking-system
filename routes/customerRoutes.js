const express = require('express');
const { register, login, bookFlight, getBookings } = require('../controllers/customerController'); 
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/register', register); 
router.post('/login', login); 
router.post('/book-flight', authMiddleware, bookFlight);
router.get('/bookings', authMiddleware, getBookings);


module.exports = router;
