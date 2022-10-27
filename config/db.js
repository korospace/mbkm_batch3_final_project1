const Pool = require("pg").Pool;

const pool = new Pool({
    host:'containers-us-west-28.railway.app',
    port:'6650',
    user:'postgres',
    database:'railway',
    password:'lEqgw3VdFiGSEtK15iBt',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
})

module.exports = pool;