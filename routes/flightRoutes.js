const express = require('express');
const { addFlight, getFlights, deleteFlight } = require('../controllers/flightController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, addFlight);
router.get('/', getFlights);
router.delete('/:id', authMiddleware, deleteFlight); 

module.exports = router;
