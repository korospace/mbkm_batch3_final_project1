const Pool = require("pg").Pool;

const pool = new Pool({
    host:'ec2-54-147-36-107.compute-1.amazonaws.com',
    port:'5432',
    user:'xegiidcmedfazi',
    database:'d2jmb5m8fsud5f',
    password:'c033081de4cc9fe453dbedacc48516c965411d7651f011df11ae37904a1d865a',
    ssl: {
        rejectUnauthorized: false,
    },
})

module.exports = pool;