const express = require("express");
const config_data = require("../config/config.json");
const helper = require('../helper/helper');
const login = require('../services/loginguest');

const router = express.Router();

router.post('/', async(request,response) => {     
    try {
        const {email, password} = request.body;
        
        if(helper.checkNUllandUndefined(request.body) || helper.checkNUllandUndefined(email) || helper.checkNUllandUndefined(password) ) {
            return response.status(400).send("Bad request");
        }
        let result = await login.doLogin(email, password);
        if(result.length === 1){
            return response.status(200).send({
                "status" : true,
                "message" : "Guest Logged In",
                "result" : JSON.stringify(result)
            }); 
        }
        else{
            return response.status(200).send({
                "status" : false,
                "message" : "Email/Password is Incorrect"
            });
        }
    }
    catch(error) {
        return response.status(500).send({
            "status" : false,
            "message" : `Request of Guest login could not be processed due to : 
            ${(error.stack == null || error.stack == undefined) ? error : error.stack} `
        });
    } 
});

module.exports = router;