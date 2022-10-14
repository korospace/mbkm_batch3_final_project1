const { validationResult } = require('express-validator');
const { generateToken } = require("../helpers/jwt");
const db = require('../config/db');

class UsersController {
    /**
     * Register
     */
    static async userRegister(req, res) {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    message: "bad request",
                    errors: errors.mapped()
                });
            }
            else {
                const time = new Date().toISOString();
                const password = req.body.password;
                const email = req.body.email;

                await db.query(
                    `INSERT INTO users (email,password,created_date,modified_date) VALUES ($1, $2, $3, $4)`, [email,password,time,time]);
                
                return res.status(201).json({
                    message: 'account created successfully'
                });
            }
        } catch (error) {
            return res.status(500).json({
                message:error
            });
        }
    }
    /**
     * Login
     */
    static async userLogin(req, res) {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    message: "bad request",
                    errors: errors.mapped()
                });
            }
            else {
                const password = req.body.password;
                const email = req.body.email;

                let dbResult = await db.query(
                    `SELECT * FROM users WHERE email = $1`, [email]);
                    
                if (dbResult.rows.length == 0) {
                    return res.status(401).json({
                        message: "email or password is not correct",
                    });
                } else {
                    if (dbResult.rows[0].password != password) {
                        return res.status(401).json({
                            message: "email or password is not correct",
                        }); 
                    }
                    else {
                        let payload = {
                            id: dbResult.rows[0].id,
                            email: dbResult.rows[0].email,
                        }

                        return res.status(200).json({
                            token: generateToken(payload),
                        });
                    }
                }
            }
        } catch (error) {
            return res.status(500).json({
                message:error
            });
        }
    }

    /**
     * Find By Email
     */
     static async findUserByEmail(email) {
        try {
            let result = await db.query(
                `SELECT * FROM users WHERE email = $1`, [email]);
                
            if (result.rows.length == 0) {
                return false;
            } else {
                return true;
            }
        } catch (error) {
            return res.status(500).json({
                message:error
            });
        }
    }
}

module.exports = UsersController;