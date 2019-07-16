/* eslint-disable no-var */
/* eslint-disable no-unused-expressions */
/* eslint-disable prefer-destructuring */
import chai from 'chai';
import chaiHttp from 'chai-http';
import db from '../src/models/userModel';
import server from '../src/server';

const expect = chai.expect;
chai.use(chaiHttp);

// Adding user functionality
describe('User functionalities', () => {
  before(done => {
    const deleteQuery = 'DELETE FROM users';
    db.query(deleteQuery).then(() => {
      console.log('table dropped successfully');
    });
    done();
  });

  describe('/POST create new user', () => {
    it('it should create a new user', done => {
      const user = {
        first_name: 'Chinedu',
        last_name: 'Paul',
        email: 'hinisco@gmail.com',
        password: 'randompassword',
        is_admin: true
      };
      chai
        .request(server)
        .post('/api/v1/auth/signup')
        .send(user)
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.have.status('success');
          expect(res.body.token).to.exist;
          done();
        });
    });
    it('it should not create a new user without an email', done => {
      const user = {
        first_name: 'Chinedu',
        last_name: 'Paul',
        password: 'randompassword',
        is_admin: true
      };
      chai
        .request(server)
        .post('/api/v1/auth/signup')
        .send(user)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.have.status('error');
          done();
        });
    });
  });

  describe('/POST login a user', () => {
    let token;
    beforeEach(done => {
      const user = {
        first_name: 'Chinedu',
        last_name: 'Paul',
        email: 'paulisco@gmail.com',
        password: 'randompassword',
        is_admin: true
      };
      chai
        .request(server)
        .post('/api/v1/auth/signup')
        .send(user)
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.have.status('success');
          expect(res.body.token).to.exist;
          token = res.body.token;
          done();
        });
      console.log('user created successfully to test login');
    });

    afterEach(done => {
      const deleteQuery = 'DELETE FROM users';
      db.query(deleteQuery).then(() => {
        token = '';
        console.log('table dropped successfully to test login');
        done();
      });
    });

    it('it should login a user', done => {
      const user = {
        email: 'paulisco@gmail.com',
        password: 'randompassword'
      };
      chai
        .request(server)
        .post('/api/v1/auth/signin')
        .set('x-access-token', `Bearer ${token}`)
        .send(user)
        .end((err, res) => {
          console.log(res.body || err);
          expect(res).to.have.status(200);
          expect(res.body).to.have.status('success');
          done();
        });
    });

    it('it should make sure a username and password is provided', done => {
      const user = {
        email: 'chinedu@gmail.com',
        password: ''
      };
      chai
        .request(server)
        .post('/api/v1/auth/signin')
        .set('x-access-token', `Bearer ${token}`)
        .send(user)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.have.status('error');
          done();
        });
    });

    it('should not login a user without an access token', done => {
      const user = {
        email: 'hinisco@gmail.com',
        password: 'randompassword'
      };
      chai
        .request(server)
        .post('/api/v1/auth/signin')
        .set('x-access-token', ``)
        .send(user)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.have.status('error');
        });
      done();
    });

    it('should not login a user with invalid token', done => {
      const user = {
        email: 'paulisco@gmail.com',
        password: 'randompassword'
      };
      chai
        .request(server)
        .post('/api/v1/auth/signin')
        .set('x-access-token', `Bearer ${token}randomtexttoinvalidatethetoken`)
        .send(user)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.have.status('error');
        });
      done();
    });
    // it('should not login a user with expired token', done => {
    //   const user = {
    //     email: 'paulisco@gmail.com',
    //     password: 'randompassword'
    //   };
    //   setTimeout(() => {
    //     chai
    //       .request(server)
    //       .post('/api/v1/auth/signin')
    //       .set('x-access-token', `Bearer ${token}`)
    //       .send(user)
    //       .end((err, res) => {
    //         expect(res).to.have.status(400);
    //         expect(res.body).to.have.status('error');
    //       });
    //     done();
    //   }, 1900);
    // });
  });
});
