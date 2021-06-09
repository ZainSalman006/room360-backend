const customQuery = require("../model/index");
const config_data = require("../config/config.json");

const doLogin = async(email, password) => {
    let query = `SELECT g_id FROM  room360.guest_users WHERE "email"= '${email}' AND "password"= '${password}'`;

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

exports.doLogin = doLogin;