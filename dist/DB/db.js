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
// TODO: Add bus availability and number of seat remaining

var createUsersTables = function createUsersTables() {
  var queryText = "CREATE TABLE IF NOT EXISTS\n      users(\n        id UUID PRIMARY KEY,\n        first_name VARCHAR(128) NOT NULL,\n        last_name VARCHAR(128) NOT NULL,\n        email VARCHAR(128) NOT NULL,\n        password VARCHAR(128) NOT NULL,\n        is_admin BOOLEAN,\n        created_date TIMESTAMP,\n        modified_date TIMESTAMP,\n        UNIQUE (email)\n      )";
  pool.query(queryText).then(function (res) {
    console.log(res);
    pool.end();
  })["catch"](function (err) {
    console.log(err);
    pool.end();
  });
};

var createBusTable = function createBusTable() {
  var queryText = "CREATE TABLE IF NOT EXISTS\n      buses(\n        id UUID PRIMARY KEY,\n        number_plate VARCHAR(128) NOT NULL,\n        manufacturer VARCHAR(128) NOT NULL,\n        model VARCHAR(128) NOT NULL,\n        year VARCHAR(10) NOT NULL,\n        capacity INTEGER NOT NULL,\n        available_seat INTEGER NOT NULL,\n        status BOOLEAN,\n        created_date TIMESTAMP,\n        modified_date TIMESTAMP,\n        UNIQUE (number_plate)\n      )";
  pool.query(queryText).then(function (res) {
    console.log(res);
    pool.end();
  })["catch"](function (err) {
    console.log(err);
    pool.end();
  });
}; // TODO :Table is still missing some features like status


var createTripTable = function createTripTable() {
  var queryText = "CREATE TABLE IF NOT EXISTS\n      trips(\n        id UUID PRIMARY KEY,\n        bus_id VARCHAR(128) NOT NULL,\n        origin VARCHAR(128) NOT NULL,\n        destination VARCHAR(128) NOT NULL,\n        trip_date VARCHAR(128) NOT NULL,\n        fare NUMERIC (5, 2),\n        status BOOLEAN DEFAULT true,\n        created_date TIMESTAMP,\n        modified_date TIMESTAMP,\n        FOREIGN KEY (bus_id) REFERENCES buses (number_plate) ON DELETE CASCADE\n      )";
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


var dropUsersTables = function dropUsersTables() {
  var queryText = 'DROP TABLE IF EXISTS users';
  pool.query(queryText).then(function (res) {
    console.log(res);
    pool.end();
  })["catch"](function (err) {
    console.log(err);
    pool.end();
  });
};

var dropBusTable = function dropBusTable() {
  var queryText = 'DROP TABLE IF EXISTS buses';
  pool.query(queryText).then(function (res) {
    console.log(res);
    pool.end();
  })["catch"](function (err) {
    console.log(err);
    pool.end();
  });
};

var dropTripTable = function dropTripTable() {
  var queryText = "DROP TABLE IF EXISTS trips";
  pool.query(queryText).then(function (res) {
    console.log(res);
    pool.end();
  })["catch"](function (err) {
    console.log(err);
    pool.end();
  });
};
/**
 * Create all Tables
 */


var createAllTables = function createAllTables() {
  createUsersTables();
  createBusTable();
  createTripTable();
};
/**
 * Drop  AllnTables
 */


var dropAllTables = function dropAllTables() {
  dropUsersTables();
  dropBusTable();
  dropTripTable();
};

pool.on('remove', function () {
  console.log('client removed');
  process.exit(0);
});
module.exports = {
  createAllTables: createAllTables,
  createUsersTables: createUsersTables,
  createTripTable: createTripTable,
  createBusTable: createBusTable,
  dropAllTables: dropAllTables,
  dropUsersTables: dropUsersTables,
  dropBusTable: dropBusTable,
  dropTripTable: dropTripTable
};

require('make-runnable');