const express = require('express');
const { addFlight, getFlights } = require('../controllers/flightController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, addFlight);
router.get('/', getFlights);

module.exports = router;
