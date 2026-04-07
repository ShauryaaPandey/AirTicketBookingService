const axios = require('axios');

const { BookingRepository } = require('../repository/index');
const {FLIGHT_SERVICE_PATH} = require('../config/server-config');
const ServiceError = require('../utils/errors/service-error');

class BookingService{
    constructor(){
        this.BookingRepo = new BookingRepository();
    }
   
    async createBooking(data){
        try {
            const flightId = data.flightId;

            let getFlightReqeustURL = `${FLIGHT_SERVICE_PATH}/api/v1/flights/${flightId}`;

            const response = await axios.get(getFlightReqeustURL);

            let flightData = response.data.data;

            let priceOfFlight = flightData.price;

            if(data.noOfSeats > flightData.totalSeats){
                throw new ServiceError(
                    'Something went wrong in the booking process',
                    'Seats not available');
            }

            const totalCost = priceOfFlight * data.noOfSeats;

            const bookingPayload = {...data , totalCost};

            const booking = await this.BookingRepo.create(bookingPayload);

             let updateFlightURL = `${FLIGHT_SERVICE_PATH}/api/v1/flights/${booking.flightId}`;

            const updateresponse = await axios.patch(updateFlightURL,{totalSeats : flightData.totalSeats - booking.noOfSeats});

            const finalBooking = await this.BookingRepo.update(booking.id, {status:"Booked"});
            
            return finalBooking;

        } catch (error) {
            if(error.name == 'RepoError' || error.name == 'ValidationError'){
                throw error;
            }
            throw new ServiceError(
            'Something went wrong in Booking Service',
            error.message);
        } 
    }
    
}

module.exports = BookingService;