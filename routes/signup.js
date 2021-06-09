const express = require("express");
const config_data = require("../config/config.json");
const signup = require('../services/signup');

const router = express.Router();

router.post('/', async(request,response) => {     
    try {
        const result = await source.generateSourceScripts(traceId);
        if(result.length === 0) {
            return response.status(200).send("Scripts generated");
        }
        else{
            return response.status(500).send(result);
        } 
    }
    catch(error) {
        return response.status(500).send((error.stack == null || error.stack == undefined) ? error : error.stack);
    } 
});

module.exports = router;