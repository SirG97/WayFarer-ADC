"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _bcrypt = _interopRequireDefault(require("bcrypt"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Utils = {
  /**
   * Hash Password Method
   * @param {string} password
   * @returns {string} returns hashed password
   */
  hashPassword: function hashPassword(password) {
    return _bcrypt["default"].hashSync(password, _bcrypt["default"].genSaltSync(8));
  },

  /**
   * comparePassword
   * @param {string} hashPassword
   * @param {string} password
   * @returns {Boolean} return True or False
   */
  comparePassword: function comparePassword(hashPassword, password) {
    return _bcrypt["default"].compareSync(password, hashPassword);
  },

  /**
   * isValidEmail helper method
   * @param {string} email
   * @returns {Boolean} True or False
   */
  validateEmail: function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }
};
var _default = Utils;
exports["default"] = _default;