const Pool = require('pg').Pool;

const pool = new Pool({
    user: "postgres",
    password: "Astana97$",
    host: "localhost",
    post: 5432,
    database: "newdata"
});


module.exports = pool;