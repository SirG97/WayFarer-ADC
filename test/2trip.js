/* eslint-disable no-unused-expressions */
/* eslint-disable prefer-destructuring */
import chai from 'chai';
import chaiHttp from 'chai-http';
import db from '../src/models/userModel';
import server from '../src/server';

const expect = chai.expect;
chai.use(chaiHttp);

describe('Trip functionalities', () => {
  let token;
  before(done => {
    const user = {
      first_name: 'Chinedu',
      last_name: 'Paul',
      email: 'baboronuka@gmail.com',
      password: 'randompassword',
      is_admin: true
    };
    chai
      .request(server)
      .post('/api/v1/auth/signup')
      .send(user)
      .end((err, res) => {
        console.log(res.body);
        expect(res).to.have.status(201);
        expect(res.body).to.have.status('success');
        expect(res.body.token).to.exist;
        token = res.body.token;
        done();
      });
    console.log('user in trip created successfully to test trip');
  });

  after(done => {
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
  describe('/POST create a new trip', () => {
    let busId;
    let tripId;
    beforeEach(done => {
      // create a new bus first
      const bus = {
        number_plate: '2TF6GKMhgNHDA6',
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
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.have.status('success');
          console.log('This is the response of bus creation');
          console.log(res.body || err);
          busId = res.body.data.number_plate;
          done();
        });
    });

    it('it should create a new trip', done => {
      const trip = {
        bus_id: busId,
        origin: 'Spain',
        destination: 'Germany',
        fare: 30.25,
        available_seat: 30,
        trip_date: '2019-09-09',
        status: true
      };
      console.log(`This is the ${busId} but the bus is fucking up.`);
      chai
        .request(server)
        .post('/api/v1/trips')
        .set('x-access-token', `Bearer ${token}`)
        .send(trip)
        .end((err, res) => {
          // console.log(res.body || err);
          expect(res).to.have.status(201);
          expect(res.body).to.have.status('success');
          tripId = res.body.data.id;
          console.log(tripId);
          done();
        });
    });

    // it('it should get a single trip', () => {
    //   chai
    //     .request(server)
    //     .get(`/api/vi/trips/${tripId}`)
    //     .set('x-access-token', `Bearer ${token}`)
    //     .end((err, res) => {
    //       expect(res).to.have.status(200);
    //       expect(res.body).to.have.status('success');
    //     });
    // });
    // it('it should get all trips', () => {
    //   chai
    //     .request(server)
    //     .get(`/api/vi/trips/`)
    //     .set('x-access-token', `Bearer ${token}`)
    //     .expect(200)
    //     .end((err, res) => {
    //       expect(res.body).to.have.status('success');
    //     });
    // });
    // it('it should delete a trip', () => {
    //   chai
    //     .request(server)
    //     .delete(`/api/vi/trips/${tripId}`)
    //     .set('x-access-token', `Bearer ${token}`)
    //     .expect(204)
    //     .end((err, res) => {
    //       expect(res.body).to.have.status('success');
    //     });
    // });
  });
});
