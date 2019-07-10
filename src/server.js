import express from 'express';
import '@babel/polyfill';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import User from './controllers/Users';

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
  basePath: '/api/v1/' // the basepath of your endpoint
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
// app.post('/api/v1/auth/signin', User.login);

const server = app.listen(3000, () => {
  console.log('app running on port ', 3000);
});

module.exports = server;
