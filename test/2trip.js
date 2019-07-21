/* eslint-disable no-unused-expressions */
/* eslint-disable prefer-destructuring */
import chai from 'chai';
import chaiHttp from 'chai-http';
import db from '../src/models/userModel';
import server from '../src/server';

const expect = chai.expect;
chai.use(chaiHttp);

before(done => {
  const deletetrip = 'DELETE FROM trips';
  const deletebus = 'DELETE FROM buses';
  const deleteuser = 'DELETE FROM users';

  db.query(deletetrip).then(() => {
    console.log('trip table dropped successfully');
  });
  db.query(deletebus).then(() => {
    console.log('bus table dropped successfully');
  });
  db.query(deleteuser).then(() => {
    console.log('user table dropped successfully');
  });
  done();
});

describe('Trip functionalities', () => {
  let token;
  let busId;
  let tripId;
  before(async () => {
    const user = {
      first_name: 'Chinedu',
      last_name: 'Paul',
      email: 'borkisoto@gmail.com',
      password: 'randompassword',
      is_admin: true
    };
    await chai
      .request(server)
      .post('/api/v1/auth/signup')
      .send(user)
      .then(res => {
        expect(res).to.have.status(201);
        expect(res.body).to.have.status('success');
        token = res.body.token;
        console.log('user created');
      })
      .then(() => {
        const bus = {
          number_plate: '2T6GKMhgAjfg9k',
          manufacturer: 'Chevrolette',
          model: 'Mustang',
          year: '2018',
          capacity: 20,
          available_seat: 10,
          status: 1
        };
        chai
          .request(server)
          .post('/api/v1/bus')
          .set('x-access-token', `Bearer ${token}`)
          .send(bus)
          .then(res => {
            busId = res.body.data.number_plate;
            console.log('bus created');
          })
          .then(() => {
            console.log('creating trip ....');
            const tripinit = {
              bus_id: busId,
              origin: 'Aba',
              destination: 'Britain',
              fare: 78.25,
              available_seat: 85,
              trip_date: '2019-09-09',
              status: true
            };
            chai
              .request(server)
              .post('/api/v1/trips')
              .set('x-access-token', `Bearer ${token}`)
              .send(tripinit)
              .then(res => {
                tripId = res.body.data.id;
                console.log('trip created');
              });
          });
      })
      .catch(error => {
        console.log(error);
      });
  });

  it('it should create a new trip', done => {
    const trip = {
      bus_id: '2T6GKMhgAjfg9k',
      origin: 'Spain',
      destination: 'Germany',
      fare: 30.25,
      available_seat: 30,
      trip_date: '2019-09-09',
      status: true
    };
    chai
      .request(server)
      .post('/api/v1/trips')
      .set('x-access-token', `Bearer ${token}`)
      .send(trip)
      .end((err, res) => {
        console.log(res);
        expect(res).to.have.status(201);
        expect(res.body).to.have.status('success');
        expect(res.body.data).to.have.property('id');
        expect(res.body.data)
          .to.have.property('bus_id')
          .to.equal('2T6GKMhgAjfg9k');
        expect(res.body.data)
          .to.have.property('bus_id')
          .to.equal('2T6GKMhgAjfg9k');
        expect(res.body.data)
          .to.have.property('destination')
          .to.equal('Germany');
        done();
      });
  });
  it('it should get all trips', done => {
    chai
      .request(server)
      .get(`/api/v1/trips`)
      .set('x-access-token', `Bearer ${token}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.status('success');
      });
    done();
  });
  it('it should get a single trip', () => {
    const trip = tripId;
    chai
      .request(server)
      .get(`/api/v1/trips/${trip}`)
      .set('x-access-token', `Bearer ${token}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.status('success');
      });
  });
  it('it should delete a trip', () => {
    const trip = tripId;
    setTimeout(() => {
      chai
        .request(server)
        .delete(`/api/v1/trips/${trip}`)
        .set('x-access-token', `Bearer ${token}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body)
            .to.have.property('status')
            .to.equal('success');
          expect(res.body)
            .to.have.property('message')
            .to.equal('Trip deleted successfully');
        });
    }, 500);
  });
});
