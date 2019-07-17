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

var Trips = {
  /**
   * Create A Trip
   * @param {object} req
   * @param {object} res
   * @returns {object} user object
   */
  create_trip: function () {
    var _create_trip = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(req, res) {
      var createTrip, values, _ref, rows;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (req.body.bus_id) {
                _context.next = 2;
                break;
              }

              return _context.abrupt("return", res.status(400).send({
                status: 'error',
                error: 'Choose a bus please.'
              }));

            case 2:
              if (req.body.origin) {
                _context.next = 4;
                break;
              }

              return _context.abrupt("return", res.status(400).send({
                status: 'error',
                error: 'Select trip origin'
              }));

            case 4:
              if (req.body.destination) {
                _context.next = 6;
                break;
              }

              return _context.abrupt("return", res.status(400).send({
                status: 'error',
                error: 'Where is this trip destination'
              }));

            case 6:
              if (req.body.fare) {
                _context.next = 8;
                break;
              }

              return _context.abrupt("return", res.status(400).send({
                status: 'error',
                error: 'How much is this trip'
              }));

            case 8:
              if (req.body.trip_date) {
                _context.next = 10;
                break;
              }

              return _context.abrupt("return", res.status(400).send({
                status: 'error',
                error: 'Which day is the trip happening'
              }));

            case 10:
              // TODO: check if table exists before starting to insert into the database
              createTrip = "INSERT INTO\n      trips(id, bus_id, origin, destination, fare, trip_date, created_date, modified_date)\n      VALUES($1, $2, $3, $4, $5, $6, $7, $8)\n      returning *";
              values = [(0, _v["default"])(), req.body.bus_id, req.body.origin, req.body.destination, req.body.fare, req.body.trip_date, (0, _moment["default"])(new Date()), (0, _moment["default"])(new Date())];
              _context.prev = 12;
              _context.next = 15;
              return _userModel["default"].query(createTrip, values);

            case 15:
              _ref = _context.sent;
              rows = _ref.rows;
              return _context.abrupt("return", res.status(201).send({
                status: 'success',
                data: rows[0]
              }));

            case 20:
              _context.prev = 20;
              _context.t0 = _context["catch"](12);
              return _context.abrupt("return", res.status(400).send({
                status: 'error',
                error: _context.t0
              }));

            case 23:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[12, 20]]);
    }));

    function create_trip(_x, _x2) {
      return _create_trip.apply(this, arguments);
    }

    return create_trip;
  }(),

  /**
   * Get A Trip
   * @param {object} req
   * @param {object} res
   * @returns {object} trip object
   */
  get_single_trip: function () {
    var _get_single_trip = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2(req, res) {
      var text, _ref2, rows;

      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              text = 'SELECT * FROM trips WHERE id = $1';
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
                status: 'error',
                message: 'trip not found'
              }));

            case 8:
              return _context2.abrupt("return", res.status(200).send({
                status: 'error',
                data: rows[0]
              }));

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

    function get_single_trip(_x3, _x4) {
      return _get_single_trip.apply(this, arguments);
    }

    return get_single_trip;
  }(),

  /**
   * Update A Trip
   * @param {object} req
   * @param {object} res
   * @returns {object} trip object
   */
  get_all_trips: function () {
    var _get_all_trips = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee3(req, res) {
      var text, _ref3, rows, rowCount;

      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              text = 'SELECT * FROM trips';
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
              return _context3.abrupt("return", res.status(400).send({
                status: 'error',
                error: _context3.t0
              }));

            case 13:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[1, 10]]);
    }));

    function get_all_trips(_x5, _x6) {
      return _get_all_trips.apply(this, arguments);
    }

    return get_all_trips;
  }(),

  /**
   * Update A Trip
   * @param {object} req
   * @param {object} res
   * @returns {object} trip object
   */
  update_trip: function () {
    var _update_trip = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee4(req, res) {
      var findtrip, updatetrip, _ref4, rows, values, response;

      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              findtrip = "SELECT * FROM trips WHERE id=$1";
              updatetrip = "UPDATE trips SET status=$1 WHERE id=$2 returning *";
              _context4.prev = 2;
              _context4.next = 5;
              return _userModel["default"].query(findtrip, [req.params.id]);

            case 5:
              _ref4 = _context4.sent;
              rows = _ref4.rows;

              if (rows[0]) {
                _context4.next = 9;
                break;
              }

              return _context4.abrupt("return", res.status(400).send({
                status: 'error',
                error: 'This trip does not exist.'
              }));

            case 9:
              console.log(req.body.status);

              if (typeof req.body.status !== 'boolean') {
                req.body.status = rows[0].status;
              }

              console.log(req.body.status);
              values = [req.body.status, req.params.id];
              _context4.next = 15;
              return _userModel["default"].query(updatetrip, values);

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
                error: _context4.t0
              }));

            case 23:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, null, [[2, 19]]);
    }));

    function update_trip(_x7, _x8) {
      return _update_trip.apply(this, arguments);
    }

    return update_trip;
  }(),

  /**
   * Delete A Trip
   * @param {object} req
   * @param {object} res
   * @returns {object} trip object
   */
  delete_trip: function () {
    var _delete_trip = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee5(req, res) {
      var deletetrip, _ref5, rows;

      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              deletetrip = 'DELETE FROM trips WHERE id=$1 returning *';
              _context5.prev = 1;
              _context5.next = 4;
              return _userModel["default"].query(deletetrip, [req.params.id]);

            case 4:
              _ref5 = _context5.sent;
              rows = _ref5.rows;

              if (rows[0]) {
                _context5.next = 8;
                break;
              }

              return _context5.abrupt("return", res.status(404).send({
                status: 'success',
                message: 'Sorry trip not found'
              }));

            case 8:
              return _context5.abrupt("return", res.status(204).send({
                status: 'success',
                message: 'deleted'
              }));

            case 11:
              _context5.prev = 11;
              _context5.t0 = _context5["catch"](1);
              return _context5.abrupt("return", res.status(400).send(_context5.t0));

            case 14:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, null, [[1, 11]]);
    }));

    function delete_trip(_x9, _x10) {
      return _delete_trip.apply(this, arguments);
    }

    return delete_trip;
  }()
};
var _default = Trips;
exports["default"] = _default;