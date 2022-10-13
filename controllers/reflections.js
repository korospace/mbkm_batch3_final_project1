const db = require('../config/db');

class ReflectionsController {
    /**
     * Get Reflections
     */
    static async getReflections(req, res) {
        try {
            let results = await db.query('SELECT * FROM reflections');

            return res.status(200).json(results.rows);
        } catch (error) {
            return res.status(500).json({
                message:error
            });
        }
    }
}

module.exports = ReflectionsController;