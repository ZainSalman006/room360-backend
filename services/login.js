const customQuery = require("../model/index");
const config_data = require("../config/config.json");

const doLogin = async(email, password , user) => {
    let query;
    if(user === "guest"){
        query = `SELECT g_id FROM  room360.guest_users WHERE "email"= '${email}' AND "password"= '${password}'`;
    }
    else{
        query = `SELECT g_id FROM  room360.host_users WHERE "email"= '${email}' AND "password"= '${password}'`;
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

exports.doLogin = doLogin;