import moment from 'moment';
import uuidv4 from 'uuid/v4';
import db from '../models/userModel';

const Trips = {
  /**
   * Create A Trip
   * @param {object} req
   * @param {object} res
   * @returns {object} user object
   */
  async create_trip(req, res) {
    if (!req.body.bus_id) {
      return res.status(400).send({ status: 'error', error: 'Choose a bus please.' });
    }
    if (!req.body.origin) {
      return res.status(400).send({ status: 'error', error: 'Select trip origin' });
    }
    if (!req.body.destination) {
      return res.status(400).send({ status: 'error', error: 'Where is this trip destination' });
    }
    if (!req.body.fare) {
      return res.status(400).send({ status: 'error', error: 'How much is this trip' });
    }
    if (!req.body.trip_date) {
      return res.status(400).send({ status: 'error', error: 'Which day is the trip happening' });
    }

    // TODO: check if table exists before starting to insert into the database

    const createTrip = `INSERT INTO
      trips(id, bus_id, origin, destination, fare, trip_date, created_date, modified_date)
      VALUES($1, $2, $3, $4, $5, $6, $7, $8)
      returning *`;
    const values = [
      uuidv4(),
      req.body.bus_id,
      req.body.origin,
      req.body.destination,
      req.body.fare,
      req.body.trip_date,
      moment(new Date()),
      moment(new Date())
    ];

    try {
      const { rows } = await db.query(createTrip, values);
      return res.status(201).send({ status: 'success', data: rows[0] });
    } catch (error) {
      return res.status(400).send({ status: 'error', error });
    }
  },

  /**
   * Get A Trip
   * @param {object} req
   * @param {object} res
   * @returns {object} trip object
   */
  async get_single_trip(req, res) {
    const text = 'SELECT * FROM trips WHERE id = $1';
    try {
      const { rows } = await db.query(text, [req.params.id]);
      if (!rows[0]) {
        return res.status(404).send({ status: 'error', message: 'trip not found' });
      }
      return res.status(200).send({ status: 'success', data: rows[0] });
    } catch (error) {
      return res.status(400).send(error);
    }
  },

  /**
   * Update A Trip
   * @param {object} req
   * @param {object} res
   * @returns {object} trip object
   */
  async get_all_trips(req, res) {
    const text = 'SELECT * FROM trips';
    try {
      const { rows, rowCount } = await db.query(text);

      return res.status(200).send({ status: 'success', rowCount, rows });
    } catch (error) {
      return res.status(400).send({ status: 'error', error });
    }
  },

  /**
   * Update A Trip
   * @param {object} req
   * @param {object} res
   * @returns {object} trip object
   */
  async update_trip(req, res) {
    const findtrip = `SELECT * FROM trips WHERE id=$1`;
    const updatetrip = `UPDATE trips SET status=$1 WHERE id=$2 returning *`;
    try {
      // Check if the user really exists
      const { rows } = await db.query(findtrip, [req.params.id]);
      if (!rows[0]) {
        return res.status(400).send({ status: 'error', error: 'This trip does not exist.' });
      }
      console.log(req.body.status);
      if (typeof req.body.status !== 'boolean') {
        req.body.status = rows[0].status;
      }
      console.log(req.body.status);
      const values = [req.body.status, req.params.id];
      const response = await db.query(updatetrip, values);
      return res.status(200).send({ status: 'success', data: response.rows[0] });
    } catch (error) {
      console.log(error);
      return res.status(400).send({ status: 'error', error });
    }
  },

  /**
   * Delete A Trip
   * @param {object} req
   * @param {object} res
   * @returns {object} trip object
   */
  async delete_trip(req, res) {
    const deletetrip = 'DELETE FROM trips WHERE id=$1 returning *';
    try {
      const { rows } = await db.query(deletetrip, [req.params.id]);
      if (!rows[0]) {
        return res.status(404).send({ status: 'success', message: 'Sorry trip not found' });
      }
      return res.status(200).send({ status: 'success', message: 'Trip deleted successfully' });
    } catch (error) {
      return res.status(400).send(error);
    }
  }
};

export default Trips;
