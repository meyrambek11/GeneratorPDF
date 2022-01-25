const res = require('express/lib/response');
const { Client } = require('pg');

const connectionString = 'postgres://ohipocrkkttkaf:07754b3b8a82118a1dcf5abcf396dbb3bffa1cb09bace99711714152ef215962@ec2-52-213-119-221.eu-west-1.compute.amazonaws.com:5432/d6f2rivncndj5g';

const pg_client = new Client({
  connectionString: connectionString,
  ssl: {
    rejectUnauthorized: false
  }
});

pg_client.connect()
    .then(err => {
        if (err) res.status(404).json(err);
        console.log('Postgres connects successfully');
    });

module.exports = pg_client;



// pg_client.query('SELECT table_schema,table_name FROM information_schema.tables;', (err, res) => {
//   if (err) throw err;
//   for (let row of res.rows) {
//     console.log(JSON.stringify(row));
//   }
//   pg_client.end();
// });