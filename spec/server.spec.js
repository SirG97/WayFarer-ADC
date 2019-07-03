/* eslint-disable no-unused-vars */
const Request = require('request');

describe('Simple test to check GET functionality', () => {
  let server;
  beforeAll(() => {
    server = require('../build/server');
  });

  afterAll(() => {
    // server.close;
  });
  describe('GET /', () => {
    const data = {};
    beforeAll(done => {
      Request.get('http://localhost:3000', (error, response, body) => {
        data.status = response.statusCode;
        data.body = body;
        done();
      });
    });
    it('status 200', () => {
      expect(data.status).toBe(200);
    });

    it('status 200', () => {
      expect(data.body).toBe('Yay! This is my response');
    });
  });
});
