const express = require("express");
const config_data = require("../config/config.json");
const helper = require('../helper/helper');
const contact = require('../services/contact');

const router = express.Router();

router.post('/', async(request,response) => {     
    try {
        const {name, email, message} = request.body;
        
        if(helper.checkNUllandUndefined(request.body) || helper.checkNUllandUndefined(name) || helper.checkNUllandUndefined(email) || helper.checkNUllandUndefined(message)) {
            return response.status(400).send("Bad request");
        }
        let result = await contact.addMessage(name, email, message);
        return response.status(200).send({
            "status" : true,
            "message" : "Message have been added"
        }); 
    }
    catch(error) {
        return response.status(500).send({
            "status" : false,
            "message" : `Request of message could not be processed due to : 
            ${(error.stack == null || error.stack == undefined) ? error : error.stack} `
        });
    } 
});

module.exports = router;