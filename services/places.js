const customQuery = require("../model/index");
const config_data = require("../config/config.json");

const addPlace = async(placename, description, city, area, country, address, price, images, h_id) => {
    try {
        let con = await customQuery.connectToDb();
        
        const query = `INSERT INTO room360.places
        (placename, description, city, "area", country, price, images, address, host_id)
        VALUES('${placename}', '${description}', '${city}', '${area}', '${country}',${price}, '${images}', '${address}', ${h_id})`;
        console.log(query)
        let result = await customQuery.executeQuery(con,query); 
        
        let result1 = await customQuery.executeQuery(con, `SELECT p_id FROM  room360.places 
        WHERE "placename" ='${placename}' AND "description" ='${description}' AND "city" = '${city}' AND "area" = '${area}'
        AND "country" ='${country}' AND "address" = '${address}' AND "price" = ${price} AND "images" = '${images}' AND "host_id" = ${h_id} `);
        
        await customQuery.closeConnection(con);
        
        return result1.rows;
    }
    catch(error) {
        throw error;
    }
}

const deletePlace = async(p_id) => {
    try {
        let con = await customQuery.connectToDb();
        let result1 = await customQuery.executeQuery(con, `DELETE FROM room360.places WHERE "p_id"= '${p_id}'`);
        await customQuery.closeConnection(con);
        
        return result1.rows;
    }
    catch(error) {
        throw error;
    }
} 

const getPlaces = async(h_id) => {
    try {
        let query = `SELECT * FROM  room360.places WHERE "host_id"= ${h_id}`;
        if(h_id === undefined){
            query = `SELECT p_id AS id, placename, description, city, area, country, price, images, address, host_id
            FROM room360.places
            `; 
        }
        let con = await customQuery.connectToDb();
        let result1 = await customQuery.executeQuery(con, query);
        await customQuery.closeConnection(con);
        
        return result1.rows;
    }
    catch(error) {
        throw error;
    }
} 

const updatePlace = async(id, placename, description, city, area, country, address, price, images) => {
    try {
        let con = await customQuery.connectToDb();
        const query = `UPDATE room360.places
        SET "placename" ='${placename}' , "description" ='${description}' , "city" = '${city}' , "area" = '${area}'
        , "country" ='${country}' , "address" = '${address}' , "price" = ${price} , "images" = '${images}'
        WHERE p_id=${id}`;
        let result1 = await customQuery.executeQuery(con, query);
        await customQuery.closeConnection(con);
        
        return result1.rows;
    }
    catch(error) {
        throw error;
    }
} 

exports.addPlace = addPlace;
exports.deletePlace = deletePlace;
exports.getPlaces = getPlaces;
exports.updatePlace = updatePlace;