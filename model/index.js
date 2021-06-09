const { Pool, Client } = require('pg');

const CONFIG = require('../config/config.json');


async function DatabaseConnection() {
  return new Promise(async(resolve,reject)=>{
    try{
      let client = new Client({
        user: CONFIG.pg_user,
        host: CONFIG.pg_host,
        database: CONFIG.pg_database,
        password: CONFIG.pg_password,
        port: CONFIG.pg_port,
        ssl:{ 
          require: true,
          rejectUnauthorized: false  
        }
      });

      client
        .connect()
        .then(() => {
          console.log('Successfully connected to PostGres!')
          resolve(client);
        })
        .catch(err => reject(err))
    }
    catch(err){
      reject(err);
    }
  });
}

async function executeQuery(connection, sql){
  return new Promise(async(resolve,reject)=>{  
    await connection.query(sql, (err, result)=> {        
      if (err){
        reject(err);        
      }
      else {
        resolve(result);
      }
    });
  });
}

async function closeConnection(connection)
{
  console.log("Connection Closed")
  await connection.end();
}  

module.exports.connectToDb=DatabaseConnection;
module.exports.executeQuery=executeQuery;
module.exports.closeConnection=closeConnection;