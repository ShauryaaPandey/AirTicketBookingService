const {BookingService} = require('../services/index');
const {StatusCodes} = require('http-status-codes');
const bookingService = new BookingService();


const {createChannel , publishMessage} = require('../utils/messageQueue');

const {REMINDER_BINDING_KEY} = require('../config/server-config');



class BookingController {

  
  constructor(){
        
  }

  sendMessageToQueue = async (req, res) => {
      const channel = await createChannel();
      const data = {message : 'Success'};
      publishMessage(channel,REMINDER_BINDING_KEY,JSON.stringify(data));
      return res.status(200).json({
         message : 'Success published the message'
      });
  }

   create = async (req,res) => {
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
}



module.exports = BookingController;