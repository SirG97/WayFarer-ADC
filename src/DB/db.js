const pg = require('pg');
// const dotenv = require('dotenv');

// dotenv.config();

// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL
// });

// pool.on('connect', () => {
//   console.log('connected to the db');
// });

const config = {
  user: 'wayfarer', // this is the db user credential
  database: 'wayfarer',
  password: 'rrwcscrz1',
  port: 5432,
  max: 10, // max number of clients in the pool
  idleTimeoutMillis: 30000
};
const pool = new pg.Pool(config);

pool.on('connect', () => {
  console.log('connected to the Database');
});

/**
 * Create Tables
 */
const createTables = () => {
  const queryText = `CREATE TABLE IF NOT EXISTS
      users(
        id UUID PRIMARY KEY,
        first_name VARCHAR(128) NOT NULL,
        last_name VARCHAR(128) NOT NULL,
        email VARCHAR(128) NOT NULL,
        password VARCHAR(128) NOT NULL,
        is_admin BOOLEAN,
        created_date TIMESTAMP,
        modified_date TIMESTAMP,
        UNIQUE (email)
      )`;

  pool
    .query(queryText)
    .then(res => {
      console.log(res);
      pool.end();
    })
    .catch(err => {
      console.log(err);
      pool.end();
    });
};

/**
 * Drop Tables
 */
const dropTables = () => {
  const queryText = 'DROP TABLE IF EXISTS users';
  pool
    .query(queryText)
    .then(res => {
      console.log(res);
      pool.end();
    })
    .catch(err => {
      console.log(err);
      pool.end();
    });
};

pool.on('remove', () => {
  console.log('client removed');
  process.exit(0);
});

module.exports = {
  createTables,
  dropTables,
  pool
};
require('make-runnable');
