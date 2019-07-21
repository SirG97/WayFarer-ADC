"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _userModel = _interopRequireDefault(require("../models/userModel"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var JwtAuth = {
  /**
   * Verify Token
   * @param {object} req
   * @param {object} res
   * @param {object} next
   * @returns {object|void} response object
   */
  // eslint-disable-next-line consistent-return
  verifyToken: function () {
    var _verifyToken = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(req, res, next) {
      var tokenheader, _tokenheader$split, _tokenheader$split2, token, decoded, text, _ref, rows;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              tokenheader = req.headers['x-access-token'];

              if (tokenheader) {
                _context.next = 3;
                break;
              }

              return _context.abrupt("return", res.status(400).send({
                status: 'error',
                error: 'Token is not provided',
                message: req.headers
              }));

            case 3:
              _tokenheader$split = tokenheader.split(' '), _tokenheader$split2 = _slicedToArray(_tokenheader$split, 2), token = _tokenheader$split2[1];
              _context.prev = 4;
              _context.next = 7;
              return _jsonwebtoken["default"].verify(token, process.env.SECRET);

            case 7:
              decoded = _context.sent;
              text = 'SELECT * FROM users WHERE id = $1';
              _context.next = 11;
              return _userModel["default"].query(text, [decoded.userId]);

            case 11:
              _ref = _context.sent;
              rows = _ref.rows;

              if (rows[0]) {
                _context.next = 15;
                break;
              }

              return _context.abrupt("return", res.status(400).send({
                status: 'error',
                error: 'The token you provided is invalid'
              }));

            case 15:
              req.user = {
                id: decoded.userId
              };
              req.admin = {
                admin: decoded.isAdmin
              };
              next();
              _context.next = 23;
              break;

            case 20:
              _context.prev = 20;
              _context.t0 = _context["catch"](4);
              return _context.abrupt("return", res.status(400).send({
                status: 'error',
                error: _context.t0
              }));

            case 23:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[4, 20]]);
    }));

    function verifyToken(_x, _x2, _x3) {
      return _verifyToken.apply(this, arguments);
    }

    return verifyToken;
  }()
};
var _default = JwtAuth;
exports["default"] = _default;