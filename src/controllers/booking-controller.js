const {BookingService} = require('../services/index');
const {StatusCodes} = require('http-status-codes');
const bookingService = new BookingService();

const create =async (req,res) => {
      try {
        const response = await bookingService.createBooking(req.body);
        return res.status(StatusCodes.OK).json({
            message : 'Successfully Completed the booking',
            success : true,
            err : {},
            data : response
        });
      } catch (error) {
        return res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({
            message : 'Cant complete the booking',
            success : false,
            err : error.explanation,
            data : {}
        });
      }
}

module.exports = {
    create
}