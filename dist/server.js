"use strict";

var _express = _interopRequireDefault(require("express"));

require("@babel/polyfill");

var _swaggerJsdoc = _interopRequireDefault(require("swagger-jsdoc"));

var _swaggerUiExpress = _interopRequireDefault(require("swagger-ui-express"));

var _Users = _interopRequireDefault(require("./controllers/Users"));

var _Bus = _interopRequireDefault(require("./controllers/Bus"));

var _Trips = _interopRequireDefault(require("./controllers/Trips"));

var _Auth = _interopRequireDefault(require("./middleware/Auth"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();
app.use(_express["default"].json()); // Swagger definition

var swaggerDefinition = {
  info: {
    title: 'ABL Wayfarer REST API ',
    // Title of the documentation
    version: '1.0.0',
    // Version of the app
    description: 'This is my Wayfarer project REST API for Andela Blended learning' // short description of the app

  },
  host: 'localhost:3000',
  // the host or url of the app
  basePath: '/api/v1/',
  // the basepath of your endpoint
  tags: [{
    name: 'User',
    description: 'About user cretion and login'
  }, {
    name: 'Trips',
    description: 'Creating and viewing of trips'
  }, {
    name: 'Bookings',
    description: 'Booking and cancellation of bookings by user'
  }]
}; // options for the swagger docs

var options = {
  // import swaggerDefinitions
  swaggerDefinition: swaggerDefinition,
  // path to the API docs
  apis: ['./docs/*.yaml']
}; // initialize swagger-jsdoc

var swaggerSpec = (0, _swaggerJsdoc["default"])(options); // use swagger-Ui-express for your app documentation endpoint

app.use('/docs', _swaggerUiExpress["default"].serve, _swaggerUiExpress["default"].setup(swaggerSpec));
app.get('/', function (request, response) {
  return response.status(200).send('Welcome page of Wayfarer ADC Nodejs REST API');
});
app.post('/api/v1/auth/signup', _Users["default"].create);
app.post('/api/v1/auth/signin', _Auth["default"].verifyToken, _Users["default"].login);
app.post('/api/v1/bus', _Auth["default"].verifyToken, _Bus["default"].create_bus);
app.get('/api/v1/bus', _Auth["default"].verifyToken, _Bus["default"].get_all_bus);
app.get('/api/v1/bus:number_plate', _Auth["default"].verifyToken, _Bus["default"].get_single_bus);
app.put('/api/v1/bus/:number_plate', _Bus["default"].update_bus);
app.post('/api/v1/trips', _Auth["default"].verifyToken, _Trips["default"].create_trip);
app.get('/api/v1/trips', _Auth["default"].verifyToken, _Trips["default"].get_all_trips);
app.get('/api/v1/trips/:id', _Auth["default"].verifyToken, _Trips["default"].get_single_trip);
app.put('/api/v1/trips/:id', _Auth["default"].verifyToken, _Trips["default"].update_trip);
app["delete"]('/api/v1/trips/:id', _Auth["default"].verifyToken, _Trips["default"].delete_trip);
var port = process.env.port || 3000;
var server = app.listen(port, function () {
  console.log('app running on port ', port);
});
module.exports = server;