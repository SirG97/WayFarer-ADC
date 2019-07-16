import moment from 'moment';
import uuidv4 from 'uuid/v4';
import db from '../models/userModel';

const Bus = {
  /**
   * Create A Bus
   * @param {object} req
   * @param {object} res
   * @returns {object} bus object
   */
  async create_bus(req, res) {
    console.log(req.body);
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
    if (!req.body.available_seat) {
      return res.status(400).send({ status: 'error', error: 'Available seat is required' });
    }
    if (req.body.status === null || undefined) {
      req.body.status = true;
    }

    const createBusQuery = `INSERT INTO
      buses(id, number_plate, manufacturer, model, year, capacity,available_seat, status, created_date, modified_date)
      VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      returning *`;
    const values = [
      uuidv4(),
      req.body.number_plate,
      req.body.manufacturer,
      req.body.model,
      req.body.year,
      req.body.capacity,
      req.body.available_seat,
      req.body.status,
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
   * Get single bus
   * @param {object} req
   * @param {object} res
   * @returns {object} bus object
   */
  async get_single_bus(req, res) {
    const text = 'SELECT * FROM bus WHERE id = $1';
    try {
      const { rows } = await db.query(text, [req.params.id]);
      if (!rows[0]) {
        return res.status(404).send({ message: 'bus not found' });
      }
      return res.status(200).send(rows[0]);
    } catch (error) {
      return res.status(400).send(error);
    }
  },
  /**
   * Get all bus
   * @param {object} req
   * @param {object} res
   * @returns {object} trip object
   */
  async get_all_bus(req, res) {
    const text = 'SELECT * FROM buses';
    try {
      const { rows, rowCount } = await db.query(text);

      return res.status(200).send({ status: 'success', rowCount, rows });
    } catch (error) {
      return res.status(400).send(error);
    }
  },
  /**
   * Update bus info
   * @param {object} req
   * @param {object} res
   * @returns {object} bus object
   */
  async update_bus(req, res) {
    const findbus = `SELECT * FROM buses WHERE number_plate=$1`;
    const updatebus = `UPDATE buses SET capacity=$1, available_seat=$2 status=$3 WHERE number_plate=$4 returning *`;
    try {
      // Check if the user really exists
      const { rows } = await db.query(findbus, [req.params.number_plate]);
      if (!rows[0]) {
        return res.status(400).send({ status: 'error', error: 'This bus does not exist.' });
      }
      if (rows[0].status === false) {
        return res.status(400).send({ status: 'error', error: 'This bus is no longer active.' });
      }

      if (req.body.status === undefined || typeof req.body.status !== 'boolean') {
        req.body.status = rows[0].status;
      }

      // TODO: check if available seat is zero
      const values = [
        req.body.capacity || rows[0].capacity,
        req.body.available_seat || rows[0].available_seat,
        req.body.status,
        req.params.number_plate
      ];
      const response = await db.query(updatebus, values);
      return res.status(200).send({ status: 'success', data: response.rows[0] });
    } catch (error) {
      console.log(error);
      return res.status(400).send({ status: 'error', error: { error } });
    }
  }
};

export default Bus;
