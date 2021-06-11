const customQuery = require("../model/index");
const config_data = require("../config/config.json");

const doBooking = async(email, fullname, phone, purposeofstay, noofpeople, dateto, datefrom, place_id, guest_id) => {
    try{
        const query = `INSERT INTO room360.bookings
        (email, fullname, phone, purposeofstay, noofpeople, dateto, datefrom, place_id, guest_id)
        VALUES('${email}', '${fullname}', '${phone}', '${purposeofstay}', ${noofpeople}, '${dateto}',
        '${datefrom}', ${place_id}, ${guest_id})`;
        let connection = await customQuery.connectToDb();
        let result = await customQuery.executeQuery(connection, query);
        await customQuery.closeConnection(connection);
        return result.rows;
    }
    catch(error){
        throw error;
    }
} 

const cancelBooking = async(b_id) => {
    try {
        let con = await customQuery.connectToDb();
        let result1 = await customQuery.executeQuery(con, `DELETE FROM  room360.bookings WHERE "b_id"= ${b_id}`);
        await customQuery.closeConnection(con);
        
        return result1.rows;
    }
    catch(error) {
        throw error;
    }
} 

const getBooking = async(g_id, p_id) => {
    let query;
    if(g_id === undefined){
        query = `SELECT * FROM room360.bookings WHERE "place_id" = ${p_id}`;
    }
    else{
        query = `SELECT b_id AS id, email, fullname, phone, purposeofstay, noofpeople, dateto, datefrom, place_id, guest_id
        FROM room360.bookings
        WHERE "guest_id" = ${g_id}`;
    }
    try {
        let con = await customQuery.connectToDb();
        let result1 = await customQuery.executeQuery(con, query);
        await customQuery.closeConnection(con);
        
        return result1.rows;
    }
    catch(error) {
        throw error;
    }
} 

const updateBooking = async(b_id, email, fullname, phone, purposeofstay, noofpeople, dateto, datefrom, place_id, guest_id) => {
    try{
        const query = `UPDATE room360.bookings
        SET email='${email}', fullname='${fullname}', phone='${phone}', purposeofstay='${purposeofstay}', 
        noofpeople=${noofpeople}, dateto='${dateto}', datefrom='${datefrom}', place_id=${place_id}, guest_id=${guest_id}
        WHERE b_id=${b_id}`;
        let connection = await customQuery.connectToDb();
        let result = await customQuery.executeQuery(connection, query);
        await customQuery.closeConnection(connection);
        return result.rows;
    }
    catch(error){
        throw error;
    }
} 

exports.updateBooking = updateBooking;
exports.doBooking = doBooking;
exports.cancelBooking = cancelBooking;
exports.getBooking = getBooking;