import express from 'express';
import '@babel/polyfill';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import User from './controllers/Users';
import Bus from  './controllers/Bus';
import Trips from './controllers/Trips';
import Auth from './middleware/Auth';

const app = express();

app.use(express.json());

// Swagger definition
const swaggerDefinition = {
  info: {
    title: 'ABL Wayfarer REST API ', // Title of the documentation
    version: '1.0.0', // Version of the app
    description: 'This is my Wayfarer project REST API for Andela Blended learning' // short description of the app
  },
  host: 'localhost:3000', // the host or url of the app
  basePath: '/api/v1/', // the basepath of your endpoint
  tags: [
    {
      name: 'User',
      description: 'About user cretion and login'
    },
    {
      name: 'Trips',
      description: 'Creating and viewing of trips'
    },
    {
      name: 'Bookings',
      description: 'Booking and cancellation of bookings by user'
    }
  ]
};

// options for the swagger docs
const options = {
  // import swaggerDefinitions
  swaggerDefinition,
  // path to the API docs
  apis: ['./docs/*.yaml']
};
// initialize swagger-jsdoc
const swaggerSpec = swaggerJSDoc(options);

// use swagger-Ui-express for your app documentation endpoint
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/', (request, response) => {
  return response.status(200).send('Welcome page of Wayfarer ADC Nodejs REST API');
});

app.post('/api/v1/auth/signup', User.create);
app.post('/api/v1/auth/signin', Auth.verifyToken, User.login);

app.post('/api/v1/bus', Auth.verifyToken, Bus.create_bus);
app.get('/api/v1/bus', Auth.verifyToken, Bus.get_all_bus);
app.get('/api/v1/bus:number_plate', Auth.verifyToken, Bus.get_single_bus);
app.put('/api/v1/bus/:number_plate', Bus.update_bus);

app.post('/api/v1/trips', Auth.verifyToken, Trips.create_trip);
app.get('/api/v1/trips', Auth.verifyToken, Trips.get_all_trips);
app.get('/api/v1/trips/:id', Auth.verifyToken, Trips.get_single_trip);
app.put('/api/v1/trips/:id', Auth.verifyToken, Trips.update_trip);
app.delete('/api/v1/trips/:id', Auth.verifyToken, Trips.delete_trip);
const port = process.env.port || 3000;
const server = app.listen(port, () => {
  console.log('app running on port ', port);
});

module.exports = server;
