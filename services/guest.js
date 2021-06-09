const customQuery = require("../model/index");
const config_data = require("../config/config.json");

const addGuest = async(firstname, lastname, email, phone_no, password) => {
    try {
        let con = await customQuery.connectToDb();
        const query = `INSERT INTO room360."guest_users"(firstname, lastname, email, password, phone_no) VALUES ('${firstname}','${lastname}','${email}','${password}','${phone_no}')`;
        let result = await customQuery.executeQuery(con,query); 
        let result1 = await customQuery.executeQuery(con, `SELECT g_id FROM  room360.guest_users WHERE "firstname" ='${firstname}' AND "lastname" ='${lastname}' AND "email" = '${email}' AND "phone_no" = '${phone_no}'`);
        await customQuery.closeConnection(con);
        
        return result1.rows;
    }
    catch(error) {
        throw error;
    }
} 

const getGuest = async(id) => {
    try {
        let con = await customQuery.connectToDb();
        let result1 = await customQuery.executeQuery(con, `SELECT * FROM  room360.guest_users WHERE "g_id"= '${id}'`);
        await customQuery.closeConnection(con);
        
        return result1.rows;
    }
    catch(error) {
        throw error;
    }
} 

const updateGuest = async(id, firstname, lastname, email, phone_no, password) => {
    try {
        let con = await customQuery.connectToDb();
        const query = `UPDATE room360.guest_users
        SET firstname='${firstname}', lastname='${lastname}', email='${email}', "password"='${password}', phone_no='${phone_no}'
        WHERE g_id=${id}`;
        let result1 = await customQuery.executeQuery(con, query);
        await customQuery.closeConnection(con);
        
        return result1.rows;
    }
    catch(error) {
        throw error;
    }
} 

const removeGuest = async(id) => {
    try {
        let con = await customQuery.connectToDb();
        let result1 = await customQuery.executeQuery(con, `DELETE FROM room360.guest_users WHERE "g_id"= '${id}'`);
        await customQuery.closeConnection(con);
        
        return result1.rows;
    }
    catch(error) {
        throw error;
    }
}

exports.addGuest = addGuest;
exports.getGuest = getGuest;
exports.updateGuest = updateGuest;
exports.removeGuest = removeGuest;
