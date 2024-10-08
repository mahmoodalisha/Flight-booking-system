// routes/customerRoutes.js
const express = require('express');
const { register, login, bookFlight } = require('../controllers/customerController'); 
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/register', register); 
router.post('/login', login); 
router.post('/book-flight', authMiddleware, bookFlight);

module.exports = router;
