import jwt from 'jsonwebtoken';
import db from '../models/userModel';

const JwtAuth = {
  /**
   * Verify Token
   * @param {object} req
   * @param {object} res
   * @param {object} next
   * @returns {object|void} response object
   */
  // eslint-disable-next-line consistent-return
  async verifyToken(req, res, next) {
    const tokenheader = req.headers['x-access-token'];
    if (!tokenheader) {
      return res
        .status(400)
        .send({ status: 'error', error: 'Token is not provided', message: req.headers });
    }
    const [, token] = tokenheader.split(' ');
    try {
      const decoded = await jwt.verify(token, process.env.SECRET);
      const text = 'SELECT * FROM users WHERE id = $1';
      const { rows } = await db.query(text, [decoded.userId]);
      if (!rows[0]) {
        return res
          .status(400)
          .send({ status: 'error', error: 'The token you provided is invalid' });
      }
      req.user = { id: decoded.userId };
      req.admin = { admin: decoded.isAdmin };
      next();
    } catch (error) {
      return res.status(400).send({ status: 'error', error });
    }
  }
};

export default JwtAuth;
