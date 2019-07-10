"use strict";

var _require = require('pg'),
    Pool = _require.Pool;

var dotenv = require('dotenv');

dotenv.config();
var pool = new Pool({
  connectionString: process.env.DATABASE_URL
});
pool.on('connect', function () {
  console.log('connected to the db');
}); // const config = {
//   user: 'wayfarer', // this is the db user credential
//   database: 'wayfarer',
//   password: 'rrwcscrz1',
//   port: 5432,
//   max: 10, // max number of clients in the pool
//   idleTimeoutMillis: 30000
// };
// const pool = new pg.Pool(config);
// pool.on('connect', () => {
//   console.log('connected to the Database');
// });

/**
 * Create Tables
 */

var createTables = function createTables() {
  var queryText = "CREATE TABLE IF NOT EXISTS\n      users(\n        id UUID PRIMARY KEY,\n        first_name VARCHAR(128) NOT NULL,\n        last_name VARCHAR(128) NOT NULL,\n        email VARCHAR(128) NOT NULL,\n        password VARCHAR(128) NOT NULL,\n        is_admin BOOLEAN,\n        created_date TIMESTAMP,\n        modified_date TIMESTAMP\n      )";
  pool.query(queryText).then(function (res) {
    console.log(res);
    pool.end();
  })["catch"](function (err) {
    console.log(err);
    pool.end();
  });
};
/**
 * Drop Tables
 */


var dropTables = function dropTables() {
  var queryText = 'DROP TABLE IF EXISTS users';
  pool.query(queryText).then(function (res) {
    console.log(res);
    pool.end();
  })["catch"](function (err) {
    console.log(err);
    pool.end();
  });
};

pool.on('remove', function () {
  console.log('client removed');
  process.exit(0);
});
module.exports = {
  createTables: createTables,
  dropTables: dropTables,
  pool: pool
};

require('make-runnable');