import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const Utils = {
  /**
   * Hash Password Method
   * @param {string} password
   * @returns {string} returns hashed password
   */
  hashPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
  },
  /**
   * comparePassword
   * @param {string} hashPassword
   * @param {string} password
   * @returns {Boolean} return True or False
   */
  comparePassword(hashPassword, password) {
    return bcrypt.compareSync(password, hashPassword);
  },
  /**
   * isValidEmail helper method
   * @param {string} email
   * @returns {Boolean} True or False
   */
  validateEmail(email) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  },

  generateToken(id) {
    const token = jwt.sign(
      {
        userId: id
      },
      process.env.SECRET,
      { expiresIn: 1 }
    );
    return token;
  }
};

export default Utils;
