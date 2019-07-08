import express from 'express';

const app = express();

app.use(express.json());

app.get('/', (request, response) => {
  return response.status(200).send('Yay! This is my response');
});

const server = app.listen(3000, () => {
  console.log('app running on port ', 3000);
});

module.exports = server;
