const express = require("express");
const config_data = require("../config/config.json");
const helper = require('../helper/helper');
const host = require('../services/host');

const router = express.Router();

router.post('/', async(request,response) => {     
    try {
        const {firstname, lastname, email, phone_no, password} = request.body;
        
        if(helper.checkNUllandUndefined(request.body) || helper.checkNUllandUndefined(firstname) || helper.checkNUllandUndefined(lastname)
        || helper.checkNUllandUndefined(email) || helper.checkNUllandUndefined(password) || helper.checkNUllandUndefined(phone_no)) {
            return response.status(400).send("Bad request");
        }
        let result = await host.addHost(firstname, lastname, email, phone_no, password);
        return response.status(200).send({
            "status" : true,
            "message" : "Host have been added",
            "result" : JSON.stringify(result)
        }); 
    }
    catch(error) {
        let e = error.toString();
        let res = e.match(/duplicate key/g);
        if(!(e === null)) {
            return response.status(200).send({
                "status" : false,
                "message" : `The Email is already taken. Please try another one`
            });
        }
        else{
            return response.status(500).send({
                "status" : false,
                "message" : `Request of add host could not be processed due to : 
                ${(error.stack == null || error.stack == undefined) ? error : error.stack} `
            });
        }
    } 
});

router.put('/', async(request,response) => {     
    try {
        const {id, firstname, lastname, email, phone_no, password} = request.body;
        
        if(helper.checkNUllandUndefined(request.body) || helper.checkNUllandUndefined(firstname) || helper.checkNUllandUndefined(lastname)
        || helper.checkNUllandUndefined(id) || helper.checkNUllandUndefined(email) || helper.checkNUllandUndefined(password) || helper.checkNUllandUndefined(phone_no)) {
            return response.status(400).send("Bad request");
        }

        const result = await host.updateHost(id, firstname, lastname, email, phone_no, password);
        return response.status(200).send({
            "status" : true,
            "message" : "Host info have been updated",
            "result" : JSON.stringify(result)
        }); 
    }
    catch(error) {
        return response.status(500).send({
            "status" : false,
            "message" : `Request of update host could not be processed due to : 
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

        const result = await host.getHost(id);
        
        return response.status(200).send({
            "status" : true,
            "message" : "Host has been fetched",
            "result" :  result
        });
    }
    catch(error) {
        return response.status(500).send({
            "status" : false,
            "message" : `Request of get host could not be processed due to : 
            ${(error.stack == null || error.stack == undefined) ? error : error.stack} `
        });
    } 
});

router.delete('/', async(request,response) => {     
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
        
        const result = await host.removeHost(id);
        return response.status(200).send({
            "status" : true,
            "message" : "Host has been removed"
        });
    }
    catch(error) {
        return response.status(500).send({
            "status" : false,
            "message" : `Request of remove host could not be processed due to : 
            ${(error.stack == null || error.stack == undefined) ? error : error.stack} `
        });
    } 
});

module.exports = router;