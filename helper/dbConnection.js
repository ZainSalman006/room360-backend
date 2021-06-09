const oracledb = require('oracledb');
let config_data = require('../config/config.json');
const dbConnection = function () { };

dbConnection.prototype.GetConnection = async function () {
    let connection = await oracledb.getConnection({
        user: config_data.connection.username,
        password: config_data.connection.password,
        connectString: config_data.connection.host
    });

    return connection;
}

dbConnection.GetConfiguration = async function (connection, key) {
    let query = 'SELECT * FROM CONFIGURATIONS WHERE "Key" = \'%s\' AND "Active" = 1';
    query.replace("%s", key);
    let result = await connection.execute(query);
    return result;
}

dbConnection.GetAllConfigurations = async function (connection) {
    let query = 'SELECT * FROM CONFIGURATIONS WHERE "Active" = 1';
    let result = await connection.execute(query);
    return result;
}


dbConnection.GetBatchId = async function (connection) {
    let query = `select to_number(to_char(sysdate, 'MMDDHH24MISS')) from dual`;
    let result = await connection.execute(query);
    return result.rows[0][0];
}

dbConnection.ExecuteQuery = async function (connection, query) {
    let result = await connection.execute(query);
    return result;
}

exports.dbConnection = dbConnection;