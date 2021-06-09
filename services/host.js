const customQuery = require("../model/index");
const config_data = require("../config/config.json");

const addHost = async(firstname, lastname, email, phone_no, password) => {
    try {
        let con = await customQuery.connectToDb();
        const query = `INSERT INTO room360."host_users"(firstname, lastname, email, password, phone_no) VALUES ('${firstname}','${lastname}','${email}','${password}','${phone_no}')`;
        let result = await customQuery.executeQuery(con,query); 
        let result1 = await customQuery.executeQuery(con, `SELECT h_id FROM  room360.host_users WHERE "firstname" ='${firstname}' AND "lastname" ='${lastname}' AND "email" = '${email}' AND "phone_no" = '${phone_no}'`);
        await customQuery.closeConnection(con);
        
        return result1.rows;
    }
    catch(error) {
        throw error;
    }
}

const getHost = async(id) => {
    try {
        let con = await customQuery.connectToDb();
        let result1 = await customQuery.executeQuery(con, `SELECT * FROM  room360.host_users WHERE "h_id"= '${id}'`);
        await customQuery.closeConnection(con);
        
        return result1.rows;
    }
    catch(error) {
        throw error;
    }
} 

const updateHost = async(id, firstname, lastname, email, phone_no, password) => {
    try {
        let con = await customQuery.connectToDb();
        const query = `UPDATE room360.host_users
        SET firstname='${firstname}', lastname='${lastname}', email='${email}', "password"='${password}', phone_no='${phone_no}'
        WHERE h_id=${id}`;
        let result1 = await customQuery.executeQuery(con, query);
        await customQuery.closeConnection(con);
        
        return result1.rows;
    }
    catch(error) {
        throw error;
    }
} 

const removeHost = async(id) => {
    try {
        let con = await customQuery.connectToDb();
        let result1 = await customQuery.executeQuery(con, `DELETE FROM  room360.host_users WHERE "h_id"= '${id}'`);
        await customQuery.closeConnection(con);
        
        return result1.rows;
    }
    catch(error) {
        throw error;
    }
}

exports.addHost = addHost;
exports.getHost = getHost;
exports.updateHost = updateHost;
exports.removeHost = removeHost; 