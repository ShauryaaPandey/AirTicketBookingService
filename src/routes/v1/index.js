const express = require('express');

const router = express.Router();

const { BookingController } = require('../../controllers/index');
// routes yaha add karega
router.post('/bookings',BookingController.create); 

module.exports = router;