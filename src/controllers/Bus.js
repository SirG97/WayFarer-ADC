import moment from 'moment';
// import uuidv4 from 'uuid/v4';
import db from '../models/userModel';
import Utils from './Utils';

const Bus = {
  /**
   * Create A Bus
   * @param {object} req
   * @param {object} res
   * @returns {object} bus object
   */
  async createbus(req, res) {
    if (!req.body.number_plate) {
      return res.status(400).send({ status: 'error', error: 'Number plate is required' });
    }
    if (!req.body.manufacturer) {
      return res.status(400).send({ status: 'error', error: 'Bus manufacturer is required' });
    }
    if (!req.body.model) {
      return res.status(400).send({ status: 'error', error: 'Model is required' });
    }
    if (!req.body.year) {
      return res.status(400).send({ status: 'error', error: 'Year of manufacture is required' });
    }
    if (!req.body.capacity) {
      return res.status(400).send({ status: 'error', error: 'Capacity is required' });
    }
    if (req.body.status == null || undefined) {
      return res.status(400).send({ status: 'error', error: 'Bus status should be true or false' });
    }

    const createBusQuery = `INSERT INTO
      buses(number_plate, manufacturer, model, year, capacity, created_date, modified_date)
      VALUES($1, $2, $3, $4, $5, $6, $7)
      returning *`;
    const values = [
      req.body.number_plate,
      req.body.manufacturer,
      req.body.model,
      req.body.year,
      req.body.capacity,
      moment(new Date()),
      moment(new Date())
    ];

    try {
      const { rows } = await db.query(createBusQuery, values);
      // const token = Utils.generateToken(rows[0].id);
      return res.status(201).send({ status: 'success', data: rows[0] });
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        return res.status(400).send({ status: 'error', error: 'Bus already exists' });
      }
      return res.status(400).send(error);
    }
  },
  /**
   * Update bus info
   * @param {object} req
   * @param {object} res
   * @returns {object} user object
   */
  async update(req, res) {
    // Validate the data
    if (!req.body.email) {
      return res.status(400).send({ status: 'error', error: 'Come on pal! provide you email' });
    }
    if (!req.body.password) {
      return res.status(400).send({ status: 'error', error: 'Please provide your password' });
    }
    if (!Utils.validateEmail(req.body.email)) {
      return res
        .status(400)
        .send({ status: 'error', error: 'Please enter a valid email address.' });
    }

    const updateQuery = 'SELECT * FROM users WHERE email = $1';

    try {
      // Check if the user really exists
      const { rows } = await db.query(updateQuery, [req.body.number_plate]);
      if (!rows[0]) {
        return res
          .status(400)
          .send({ status: 'error', error: 'These credentials could not be found in our records.' });
      }

      if (!Utils.comparePassword(rows[0].password, req.body.password)) {
        return res.status(400).send({ status: 'error', error: 'These credentials do not match.' });
      }

      const token = Utils.generateToken(rows[0].id);
      return res.status(200).send({ status: 'success', token, data: rows[0] });
    } catch (error) {
      console.log(error);
      return res.status(400).send({ status: 'error', error: { error } });
    }
  }
};

export default Bus;
