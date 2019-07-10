"use strict";

var _express = _interopRequireDefault(require("express"));

require("@babel/polyfill");

var _Users = _interopRequireDefault(require("./controllers/Users"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();
app.use(_express["default"].json());
app.get('/', function (request, response) {
  return response.status(200).send('Welcome page of Wayfarer ADC Nodejs REST API');
});
app.post('/api/v1/auth/signup', _Users["default"].create);
var server = app.listen(3000, function () {
  console.log('app running on port ', 3000);
});
module.exports = server;