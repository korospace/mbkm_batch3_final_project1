const { verifyToken } = require("../helpers/jwt");
const db = require('../config/db');

async function authentication(req,res,next) {
    try {
        const token = req.get("x-access-token");
        const decodedToken = verifyToken(token);

        let dbResult = await db.query(
            `SELECT * FROM users WHERE id = $1`, [decodedToken.id]);

        if (dbResult.rows.length == 0) {
            return res.status(401).json({
                message: "Unauthorized",
            });
        } else {
            res.locals.user = dbResult.rows[0];
            next();
        }

    } catch (error) {
        return res.status(401).json({
            message: "Unauthorized",
        });
    }
}

module.exports = authentication;