'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

app.use(_express2.default.json());

app.get('/', function (request, response) {
  return response.status(200).send('Yay! This is my response');
});

var server = app.listen(3000, function () {
  console.log('app running on port ', 3000);
});

module.exports = server;