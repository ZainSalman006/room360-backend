const express = require("express");
const config_data = require("../config/config.json");
const helper = require('../helper/helper');
const contact = require('../services/contact');

const router = express.Router();

router.post('/', async(request,response) => {     
    try {
        const result = await contact.addMessage();
        if(result.length === 0) {
            return response.status(200).send({
                "status" : true,
                "message" : "Message have been added"
            });
        }
        else{
            return response.status(500).send({
                "status" : false,
                "message" : `Request of add contactus could not be processed due to : 
                ${(error.stack == null || error.stack == undefined) ? error : error.stack} `
            });
        } 
    }
    catch(error) {
        return response.status(500).send({
            "status" : false,
            "message" : `Request of add contactus could not be processed due to : 
            ${(error.stack == null || error.stack == undefined) ? error : error.stack} `
        });
    } 
});

module.exports = router;