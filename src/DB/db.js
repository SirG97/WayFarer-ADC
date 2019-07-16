const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

pool.on('connect', () => {
  console.log('connected to the db');
});

// const config = {
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

// TODO: Add bus availability and number of seat remaining
const createUsersTables = () => {
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

const createBusTable = () => {
  const queryText = `CREATE TABLE IF NOT EXISTS
      buses(
        id UUID PRIMARY KEY,
        number_plate VARCHAR(128) NOT NULL,
        manufacturer VARCHAR(128) NOT NULL,
        model VARCHAR(128) NOT NULL,
        year VARCHAR(10) NOT NULL,
        capacity INTEGER NOT NULL,
        available_seat INTEGER NOT NULL,
        status BOOLEAN,
        created_date TIMESTAMP,
        modified_date TIMESTAMP,
        UNIQUE (number_plate)
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
// TODO :Table is still missing some features like status
const createTripTable = () => {
  const queryText = `CREATE TABLE IF NOT EXISTS
      trips(
        id UUID PRIMARY KEY,
        bus_id VARCHAR(128) NOT NULL,
        origin VARCHAR(128) NOT NULL,
        destination VARCHAR(128) NOT NULL,
        trip_date VARCHAR(128) NOT NULL,
        fare NUMERIC (5, 2),
        status BOOLEAN DEFAULT true,
        created_date TIMESTAMP,
        modified_date TIMESTAMP,
        FOREIGN KEY (bus_id) REFERENCES buses (number_plate) ON DELETE CASCADE
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
const dropUsersTables = () => {
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

const dropBusTable = () => {
  const queryText = 'DROP TABLE IF EXISTS buses';
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

const dropTripTable = () => {
  const queryText = `DROP TABLE IF EXISTS trips`;
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
 * Create all Tables
 */

const createAllTables = () => {
  createUsersTables();
  createBusTable();
  createTripTable();
};

/**
 * Drop  AllnTables
 */

const dropAllTables = () => {
  dropUsersTables();
  dropBusTable();
  dropTripTable();
};

pool.on('remove', () => {
  console.log('client removed');
  process.exit(0);
});

module.exports = {
  createAllTables,
  createUsersTables,
  createTripTable,
  createBusTable,
  dropAllTables,
  dropUsersTables,
  dropBusTable,
  dropTripTable
};
require('make-runnable');
