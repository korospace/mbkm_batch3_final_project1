const db = require('../config/db');

async function authorization(req,res,next) {
    const userData = res.locals.user;
    let reflId = req.params.id || 0;

    try {
        let dbResult = await db.query('SELECT * FROM reflections WHERE id = $1',[reflId]);
        
        if (dbResult.rows.length == 0) {
            return res.status(404).json({
                message: `reflection with id (${reflId}) is not found`,
            });
        } else {
            if (dbResult.rows[0].owner_id != userData.id) {
                return res.status(403).json({
                    message: `you don't have permisson to access this reflection`,
                });
            } else {
                return next();
            }
        }
    } catch (error) {
        return res.status(500).json({
            message:error
        });
    }
}

module.exports = authorization;