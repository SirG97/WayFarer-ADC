"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _moment = _interopRequireDefault(require("moment"));

var _v = _interopRequireDefault(require("uuid/v4"));

var _userModel = _interopRequireDefault(require("../models/userModel"));

var _Utils = _interopRequireDefault(require("./Utils"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var User = {
  /**
   * Create A User
   * @param {object} req
   * @param {object} res
   * @returns {object} reflection object
   */
  create: function () {
    var _create = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(req, res) {
      var hashedPassword, createQuery, values, _ref, rows;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (req.body.first_name) {
                _context.next = 2;
                break;
              }

              return _context.abrupt("return", res.status(400).send({
                status: 'error',
                error: 'First name is required'
              }));

            case 2:
              if (req.body.last_name) {
                _context.next = 4;
                break;
              }

              return _context.abrupt("return", res.status(400).send({
                status: 'error',
                error: 'Last name is required'
              }));

            case 4:
              if (req.body.email) {
                _context.next = 6;
                break;
              }

              return _context.abrupt("return", res.status(400).send({
                status: 'error',
                error: 'Email required'
              }));

            case 6:
              if (req.body.password) {
                _context.next = 8;
                break;
              }

              return _context.abrupt("return", res.status(400).send({
                status: 'error',
                error: 'Password required'
              }));

            case 8:
              if (!(req.body.is_admin == null || undefined)) {
                _context.next = 10;
                break;
              }

              return _context.abrupt("return", res.status(400).send({
                status: 'error',
                error: 'Admin status is required'
              }));

            case 10:
              if (_Utils["default"].validateEmail(req.body.email)) {
                _context.next = 12;
                break;
              }

              return _context.abrupt("return", res.status(400).send({
                status: 'error',
                error: 'Please enter a valid email address'
              }));

            case 12:
              hashedPassword = _Utils["default"].hashPassword(req.body.password);
              createQuery = "INSERT INTO\n      users(id, first_name, last_name, email, password, is_admin, created_date, modified_date)\n      VALUES($1, $2, $3, $4, $5, $6, $7, $8)\n      returning *";
              values = [(0, _v["default"])(), req.body.first_name, req.body.last_name, req.body.email, hashedPassword, req.body.is_admin, (0, _moment["default"])(new Date()), (0, _moment["default"])(new Date())];
              _context.prev = 15;
              _context.next = 18;
              return _userModel["default"].query(createQuery, values);

            case 18:
              _ref = _context.sent;
              rows = _ref.rows;
              return _context.abrupt("return", res.status(201).send({
                status: 'success',
                data: rows[0]
              }));

            case 23:
              _context.prev = 23;
              _context.t0 = _context["catch"](15);

              if (!(_context.t0.routine === '_bt_check_unique')) {
                _context.next = 27;
                break;
              }

              return _context.abrupt("return", res.status(400).send({
                status: 'error',
                error: 'User with that email already exist'
              }));

            case 27:
              return _context.abrupt("return", res.status(400).send(_context.t0));

            case 28:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[15, 23]]);
    }));

    function create(_x, _x2) {
      return _create.apply(this, arguments);
    }

    return create;
  }()
};
var _default = User;
exports["default"] = _default;