const customQuery = require("../model/index");
const config_data = require("../config/config.json");

const addMessage = async(name, email, message) => {
    try {
        let con = await customQuery.connectToDb();
        const query = `INSERT INTO room360.contact
        (email, sender_name, message)
        VALUES('${email}', '${name}', '${message}')`;
        let result = await customQuery.executeQuery(con,query); 
        await customQuery.closeConnection(con);
        
        return result.rows;
    }
    catch(error) {
        throw error;
    }
} 

exports.addMessage = addMessage;