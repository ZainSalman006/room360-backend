const express = require("express");
const config_data = require("../config/config.json");
const helper = require('../helper/helper');
const booking = require('../services/booking');

const router = express.Router();

router.post('/', async(request,response) => {     
    try {
        console.log(request.body)
        const {email, name, phone_no, purposeofstay, noofpeople, dateto, datefrom, place_id, guest_id} = request.body;
        const result = await booking.doBooking(email, name, phone_no, purposeofstay, noofpeople, dateto, datefrom, place_id, guest_id);
        if(result.length === 0) {
            return response.status(200).send({
                "status" : true,
                "message" : "Booking have been done"
            });
        }
        else{
            return response.status(500).send({
                "status" : false,
                "message" : `Request of booking could not be processed due to : 
                ${(error.stack == null || error.stack == undefined) ? error : error.stack} `
            });
        } 
    }
    catch(error) {
        return response.status(500).send({
            "status" : false,
            "message" : `Request of booking could not be processed due to : 
            ${(error.stack == null || error.stack == undefined) ? error : error.stack} `
        });
    } 
});

router.put('/', async(request,response) => {     
    try {
        const result = await booking.updateBooking();
        if(result.length === 0) {
            return response.status(200).send({
                "status" : true,
                "message" : "Booking have been updated"
            });
        }
        else{
            return response.status(500).send({
                "status" : false,
                "message" : `Request of update booking could not be processed due to : 
                ${(error.stack == null || error.stack == undefined) ? error : error.stack} `
            });
        } 
    }
    catch(error) {
        return response.status(500).send({
            "status" : false,
            "message" : `Request of update booking could not be processed due to : 
            ${(error.stack == null || error.stack == undefined) ? error : error.stack} `
        });
    } 
});

router.get('/', async(request,response) => {     
    try {
        const {id} = request.query;

        if(helper.checkNUllandUndefined(request.query) || helper.checkNUllandUndefined(id)) {
            return response.status(400).send("Bad request");
        }

        const result = await booking.getBooking(id);
        
        return response.status(200).send({
            "status" : true,
            "message" : "Bookings have been fetched",
            "result" :  result
        });
    }
    catch(error) {
        return response.status(500).send({
            "status" : false,
            "message" : `Request of get bookings could not be processed due to : 
            ${(error.stack == null || error.stack == undefined) ? error : error.stack} `
        });
    } 
});

router.delete('/cancel', async(request,response) => {     
    try {
        const {id} = request.query;

        if(helper.checkNUllandUndefined(request.query) || helper.checkNUllandUndefined(id) ) {
            return response.status(400).send({
                "status" : false,
                "message" : "One of the required attribute(s) is/are missing [query, id] "
            });
        }

        if(id < 1) {
            return response.status(400).send({
                "status" : false,
                "message" : "id must be greater than 1"
            });
        }
        
        const result = await booking.cancelBooking(id);
        return response.status(200).send({
            "status" : true,
            "message" : "Booking have been cancelled"
        });
    }
    catch(error) {
        return response.status(500).send({
            "status" : false,
            "message" : `Request of cancel booking could not be processed due to : 
            ${(error.stack == null || error.stack == undefined) ? error : error.stack} `
        });
    } 
});

module.exports = router;