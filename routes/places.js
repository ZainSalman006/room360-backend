const express = require("express");
const config_data = require("../config/config.json");
const helper = require('../helper/helper');
const place = require('../services/places');

const router = express.Router();

router.post('/', async(request,response) => {     
    try {
        const {placename, description, city, area, country, address, price, images, h_id} = request.body;
        
        if(helper.checkNUllandUndefined(request.body) || helper.checkNUllandUndefined(placename) || helper.checkNUllandUndefined(description)
        || helper.checkNUllandUndefined(city) || helper.checkNUllandUndefined(area) || helper.checkNUllandUndefined(country)
        || helper.checkNUllandUndefined(address) || helper.checkNUllandUndefined(price) || helper.checkNUllandUndefined(images) || helper.checkNUllandUndefined(h_id)) {
            return response.status(400).send("Bad request");
        }
        const result = await place.addPlace(placename, description, city, area, country, address, price, images, h_id);
        return response.status(200).send({
            "status" : true,
            "message" : "Place have been added"
        });
         
    }
    catch(error) {
        return response.status(500).send({
            "status" : false,
            "message" : `Request of add place could not be processed due to : 
            ${(error.stack == null || error.stack == undefined) ? error : error.stack} `
        });
    } 
});

router.put('/', async(request,response) => {     
    try {
        const {id, placename, description, city, area, country, address, price, images} = request.body;
        
        if(helper.checkNUllandUndefined(request.body) || helper.checkNUllandUndefined(placename) || helper.checkNUllandUndefined(description)
        || helper.checkNUllandUndefined(id) || helper.checkNUllandUndefined(city) || helper.checkNUllandUndefined(area) || helper.checkNUllandUndefined(country)
        || helper.checkNUllandUndefined(address) || helper.checkNUllandUndefined(price) || helper.checkNUllandUndefined(images)) {
            return response.status(400).send("Bad request");
        }
        const result = await place.updatePlace(id, placename, description, city, area, country, address, price, images);
        return response.status(200).send({
            "status" : true,
            "message" : "Place have been updated"
        }); 
    }
    catch(error) {
        return response.status(500).send({
            "status" : false,
            "message" : `Request of update place could not be processed due to : 
            ${(error.stack == null || error.stack == undefined) ? error : error.stack} `
        });
    } 
});

router.get('/', async(request,response) => {     
    try {
        const {h_id} = request.query;

        const result = await place.getPlaces(h_id);
        
        return response.status(200).send({
            "status" : true,
            "message" : "Places have been fetched",
            "result" :  result
        });
    }
    catch(error) {
        return response.status(500).send({
            "status" : false,
            "message" : `Request of get places could not be processed due to : 
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
        
        const result = await place.deletePlace(id);
        return response.status(200).send({
            "status" : true,
            "message" : "Place have been deleted"
        });
    }
    catch(error) {
        return response.status(500).send({
            "status" : false,
            "message" : `Request of delete place could not be processed due to : 
            ${(error.stack == null || error.stack == undefined) ? error : error.stack} `
        });
    } 
});

module.exports = router;