import moment from 'moment';
import uuidv4 from 'uuid/v4';
import db from '../models/userModel';
import Utils from './Utils';

const User = {
  /**
   * Create A User
   * @param {object} req
   * @param {object} res
   * @returns {object} reflection object
   */
  async create(req, res) {
    if (!req.body.first_name) {
      return res.status(400).send({ status: 'error', error: 'First name is required' });
    }
    if (!req.body.last_name) {
      return res.status(400).send({ status: 'error', error: 'Last name is required' });
    }
    if (!req.body.email) {
      return res.status(400).send({ status: 'error', error: 'Email required' });
    }
    if (!req.body.password) {
      return res.status(400).send({ status: 'error', error: 'Password required' });
    }
    if (req.body.is_admin == null || undefined) {
      return res.status(400).send({ status: 'error', error: 'Admin status is required' });
    }
    if (!Utils.validateEmail(req.body.email)) {
      return res.status(400).send({ status: 'error', error: 'Please enter a valid email address' });
    }

    const hashedPassword = Utils.hashPassword(req.body.password);

    const createQuery = `INSERT INTO
      users(id, first_name, last_name, email, password, is_admin, created_date, modified_date)
      VALUES($1, $2, $3, $4, $5, $6, $7, $8)
      returning *`;
    const values = [
      uuidv4(),
      req.body.first_name,
      req.body.last_name,
      req.body.email,
      hashedPassword,
      req.body.is_admin,
      moment(new Date()),
      moment(new Date())
    ];

    try {
      const { rows } = await db.query(createQuery, values);
      return res.status(201).send({ status: 'success', data: rows[0] });
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        return res
          .status(400)
          .send({ status: 'error', error: 'User with that email already exist' });
      }
      return res.status(400).send(error);
    }
  }
};

export default User;
