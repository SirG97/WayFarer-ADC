"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _moment = _interopRequireDefault(require("moment"));

var _v = _interopRequireDefault(require("uuid/v4"));

var _userModel = _interopRequireDefault(require("../models/userModel"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var Bus = {
  /**
   * Create A Bus
   * @param {object} req
   * @param {object} res
   * @returns {object} bus object
   */
  create_bus: function () {
    var _create_bus = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(req, res) {
      var createBusQuery, values, _ref, rows;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              console.log(req.body);

              if (req.body.number_plate) {
                _context.next = 3;
                break;
              }

              return _context.abrupt("return", res.status(400).send({
                status: 'error',
                error: 'Number plate is required'
              }));

            case 3:
              if (req.body.manufacturer) {
                _context.next = 5;
                break;
              }

              return _context.abrupt("return", res.status(400).send({
                status: 'error',
                error: 'Bus manufacturer is required'
              }));

            case 5:
              if (req.body.model) {
                _context.next = 7;
                break;
              }

              return _context.abrupt("return", res.status(400).send({
                status: 'error',
                error: 'Model is required'
              }));

            case 7:
              if (req.body.year) {
                _context.next = 9;
                break;
              }

              return _context.abrupt("return", res.status(400).send({
                status: 'error',
                error: 'Year of manufacture is required'
              }));

            case 9:
              if (req.body.capacity) {
                _context.next = 11;
                break;
              }

              return _context.abrupt("return", res.status(400).send({
                status: 'error',
                error: 'Capacity is required'
              }));

            case 11:
              if (req.body.available_seat) {
                _context.next = 13;
                break;
              }

              return _context.abrupt("return", res.status(400).send({
                status: 'error',
                error: 'Available seat is required'
              }));

            case 13:
              if (req.body.status === null || undefined) {
                req.body.status = true;
              }

              createBusQuery = "INSERT INTO\n      buses(id, number_plate, manufacturer, model, year, capacity,available_seat, status, created_date, modified_date)\n      VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)\n      returning *";
              values = [(0, _v["default"])(), req.body.number_plate, req.body.manufacturer, req.body.model, req.body.year, req.body.capacity, req.body.available_seat, req.body.status, (0, _moment["default"])(new Date()), (0, _moment["default"])(new Date())];
              _context.prev = 16;
              _context.next = 19;
              return _userModel["default"].query(createBusQuery, values);

            case 19:
              _ref = _context.sent;
              rows = _ref.rows;
              return _context.abrupt("return", res.status(201).send({
                status: 'success',
                data: rows[0]
              }));

            case 24:
              _context.prev = 24;
              _context.t0 = _context["catch"](16);

              if (!(_context.t0.routine === '_bt_check_unique')) {
                _context.next = 28;
                break;
              }

              return _context.abrupt("return", res.status(400).send({
                status: 'error',
                error: 'Bus already exists'
              }));

            case 28:
              return _context.abrupt("return", res.status(400).send(_context.t0));

            case 29:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[16, 24]]);
    }));

    function create_bus(_x, _x2) {
      return _create_bus.apply(this, arguments);
    }

    return create_bus;
  }(),

  /**
   * Get single bus
   * @param {object} req
   * @param {object} res
   * @returns {object} bus object
   */
  get_single_bus: function () {
    var _get_single_bus = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2(req, res) {
      var text, _ref2, rows;

      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              text = 'SELECT * FROM bus WHERE id = $1';
              _context2.prev = 1;
              _context2.next = 4;
              return _userModel["default"].query(text, [req.params.id]);

            case 4:
              _ref2 = _context2.sent;
              rows = _ref2.rows;

              if (rows[0]) {
                _context2.next = 8;
                break;
              }

              return _context2.abrupt("return", res.status(404).send({
                message: 'bus not found'
              }));

            case 8:
              return _context2.abrupt("return", res.status(200).send(rows[0]));

            case 11:
              _context2.prev = 11;
              _context2.t0 = _context2["catch"](1);
              return _context2.abrupt("return", res.status(400).send(_context2.t0));

            case 14:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[1, 11]]);
    }));

    function get_single_bus(_x3, _x4) {
      return _get_single_bus.apply(this, arguments);
    }

    return get_single_bus;
  }(),

  /**
   * Get all bus
   * @param {object} req
   * @param {object} res
   * @returns {object} trip object
   */
  get_all_bus: function () {
    var _get_all_bus = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee3(req, res) {
      var text, _ref3, rows, rowCount;

      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              text = 'SELECT * FROM buses';
              _context3.prev = 1;
              _context3.next = 4;
              return _userModel["default"].query(text);

            case 4:
              _ref3 = _context3.sent;
              rows = _ref3.rows;
              rowCount = _ref3.rowCount;
              return _context3.abrupt("return", res.status(200).send({
                status: 'success',
                rowCount: rowCount,
                rows: rows
              }));

            case 10:
              _context3.prev = 10;
              _context3.t0 = _context3["catch"](1);
              return _context3.abrupt("return", res.status(400).send(_context3.t0));

            case 13:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[1, 10]]);
    }));

    function get_all_bus(_x5, _x6) {
      return _get_all_bus.apply(this, arguments);
    }

    return get_all_bus;
  }(),

  /**
   * Update bus info
   * @param {object} req
   * @param {object} res
   * @returns {object} bus object
   */
  update_bus: function () {
    var _update_bus = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee4(req, res) {
      var findbus, updatebus, _ref4, rows, values, response;

      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              findbus = "SELECT * FROM buses WHERE number_plate=$1";
              updatebus = "UPDATE buses SET capacity=$1, available_seat=$2 status=$3 WHERE number_plate=$4 returning *";
              _context4.prev = 2;
              _context4.next = 5;
              return _userModel["default"].query(findbus, [req.params.number_plate]);

            case 5:
              _ref4 = _context4.sent;
              rows = _ref4.rows;

              if (rows[0]) {
                _context4.next = 9;
                break;
              }

              return _context4.abrupt("return", res.status(400).send({
                status: 'error',
                error: 'This bus does not exist.'
              }));

            case 9:
              if (!(rows[0].status === false)) {
                _context4.next = 11;
                break;
              }

              return _context4.abrupt("return", res.status(400).send({
                status: 'error',
                error: 'This bus is no longer active.'
              }));

            case 11:
              if (req.body.status === undefined || typeof req.body.status !== 'boolean') {
                req.body.status = rows[0].status;
              } // TODO: check if available seat is zero


              values = [req.body.capacity || rows[0].capacity, req.body.available_seat || rows[0].available_seat, req.body.status, req.params.number_plate];
              _context4.next = 15;
              return _userModel["default"].query(updatebus, values);

            case 15:
              response = _context4.sent;
              return _context4.abrupt("return", res.status(200).send({
                status: 'success',
                data: response.rows[0]
              }));

            case 19:
              _context4.prev = 19;
              _context4.t0 = _context4["catch"](2);
              console.log(_context4.t0);
              return _context4.abrupt("return", res.status(400).send({
                status: 'error',
                error: {
                  error: _context4.t0
                }
              }));

            case 23:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, null, [[2, 19]]);
    }));

    function update_bus(_x7, _x8) {
      return _update_bus.apply(this, arguments);
    }

    return update_bus;
  }()
};
var _default = Bus;
exports["default"] = _default;