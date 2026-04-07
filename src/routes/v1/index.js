const express = require('express');

const router = express.Router();

const BookingController  = require('../../controllers/booking-controller');

// const { createChannel } = require('../../utils/messageQueue');

// const channel = await new createChannel();

const bookingController = new BookingController();


// routes yaha add karega
router.post('/bookings',bookingController.create);
router.post('/publish',bookingController.sendMessageToQueue); 

module.exports = router;