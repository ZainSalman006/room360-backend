const express = require("express");
const config_data = require("../config/config.json");
const helper = require('../helper/helper');
const reviews = require('../services/reviews');

const router = express.Router();

router.post('/', async(request,response) => {     
    try {
        const {p_id, email, comment} = request.body;
        
        if(helper.checkNUllandUndefined(request.body) || helper.checkNUllandUndefined(p_id) || helper.checkNUllandUndefined(email)
        || helper.checkNUllandUndefined(comment)) {
            return response.status(400).send("Bad request");
        }
        let result = await reviews.addReviews(p_id, email, comment, rating);
        return response.status(200).send({
            "status" : true,
            "message" : "Reviews have been added"
        }); 
    }
    catch(error) {
        return response.status(500).send({
            "status" : false,
            "message" : `Request of add reviews could not be processed due to : 
            ${(error.stack == null || error.stack == undefined) ? error : error.stack} `
        });
    } 
});

router.put('/', async(request,response) => {     
    try {
        const {r_id, p_id, email, comment, rating} = request.body;
        
        if(helper.checkNUllandUndefined(request.body) || helper.checkNUllandUndefined(p_id) || helper.checkNUllandUndefined(email)
        || helper.checkNUllandUndefined(comment) || helper.checkNUllandUndefined(rating) || helper.checkNUllandUndefined(r_id)) {
            return response.status(400).send("Bad request");
        }
        let result = await reviews.updateReviews(r_id, p_id, email, comment, rating);
        return response.status(200).send({
            "status" : true,
            "message" : "Reviews have been updated"
        });
    }
    catch(error) {
        return response.status(500).send({
            "status" : false,
            "message" : `Request of update reviews could not be processed due to : 
            ${(error.stack == null || error.stack == undefined) ? error : error.stack} `
        });
    } 
});

router.get('/', async(request,response) => {     
    try {
        const {p_id} = request.query;
        
        if(helper.checkNUllandUndefined(request.query) || helper.checkNUllandUndefined(p_id)) {
            return response.status(400).send("Bad request");
        }

        const result = await reviews.getReviews(p_id);
        
        return response.status(200).send({
            "status" : true,
            "message" : "Reviews have been fetched",
            "result" :  result
        });
    }
    catch(error) {
        return response.status(500).send({
            "status" : false,
            "message" : `Request of get reviews could not be processed due to : 
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
        
        const result = await reviews.removeReviews(id);
        return response.status(200).send({
            "status" : true,
            "message" : "Reviews have been removed"
        });
    }
    catch(error) {
        return response.status(500).send({
            "status" : false,
            "message" : `Request of remove reviews could not be processed due to : 
            ${(error.stack == null || error.stack == undefined) ? error : error.stack} `
        });
    } 
});

module.exports = router;