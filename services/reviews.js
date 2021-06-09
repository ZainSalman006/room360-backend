const customQuery = require("../model/index");
const config_data = require("../config/config.json");

const addReviews = async(p_id, email, comment, rating) => {
    try {
        let con = await customQuery.connectToDb();
        const query = `INSERT INTO room360.reviews
        (email, "comment", rating, place_id)
        VALUES('${email}', '${comment}', ${rating}, ${p_id})`;
        let result1 = await customQuery.executeQuery(con, query);
        await customQuery.closeConnection(con);
        
        return result1.rows;
    }
    catch(error) {
        throw error;
    }
} 

const getReviews = async(p_id) => {
    try {
        let con = await customQuery.connectToDb();
        const query = `SELECT * FROM room360.reviews
        WHERE "place_id" = ${p_id}`;
        let result1 = await customQuery.executeQuery(con, query);
        await customQuery.closeConnection(con);
        
        return result1.rows;
    }
    catch(error) {
        throw error;
    }
} 

const updateReviews = async(r_id, p_id, email, comment, rating) => {
    try {
        let con = await customQuery.connectToDb();
        const query = `UPDATE room360.reviews
        SET email='${email}', "comment"='${comment}', rating=${rating}, place_id=${p_id}
        WHERE r_id=${r_id}`;
        let result1 = await customQuery.executeQuery(con, query);
        await customQuery.closeConnection(con);
        
        return result1.rows;
    }
    catch(error) {
        throw error;
    }
} 

const removeReviews = async(r_id) => {
    try {
        let con = await customQuery.connectToDb();
        const query = `DELETE FROM room360.reviews
        WHERE "r_id" = ${r_id}`;
        let result1 = await customQuery.executeQuery(con, query);
        await customQuery.closeConnection(con);
        
        return result1.rows;
    }
    catch(error) {
        throw error;
    }
}

exports.addReviews = addReviews;
exports.getReviews = getReviews;
exports.updateReviews = updateReviews;
exports.removeReviews = removeReviews;
