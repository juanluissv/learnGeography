/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
var should = require('chai').should() //actually call the function

//var supertest = require('supertest-as-promised')(require('../../src/app.js'));
const app = require('../../src/app.js');
const { Country, conn } = require('../../src/db.js');

const agent = session(app);
const continent = 'asdsd'
const country = {
  id: 'ARG',
  name: 'Argentina',
  flag: 'argentina.jpg',
  continent: 'Americas',
  capital: 'Buenos Aires',
  subregion: 'South America'
};

describe('Country routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));

  beforeEach(() => Country.sync({ force: true })
    .then(() => Country.create(country)));

  describe('GET /api/countries', () => {
     it('should get 200', () =>
      agent.get('/api/countries').expect(200)
    );
    it('should be a object', function() {
      agent.get('/api/countries') 
        .expect(200) 
        .expect('Content-Type', /json/) 
        .expect(function(res) {
          expect(res.body).should.be.a('object'); 
        });
    });
    it('should return 250 countries', function() {
      agent.get('/api/countries') 
        .expect(200) 
        .expect('Content-Type', /json/) 
        .expect(function(res) {
          expect(res.body.length).should.be(250); 
        });
    });

  });


  describe('GET /api/countries/id', () => {
    it('should not get a valid country', () =>
      agent.get('/api/countries/invalid').expect(404)
    );
    it('should get a valid country', () =>
      agent.get('/api/countries/ARG').expect(200)
    );
    it('should be a object', () => {
      agent.get('/api/countries/ARG') 
        .expect(200) 
        .expect('Content-Type', /json/) 
        .expect(function(res) {
          res.body.should.be.a('object'); 
        });
    });
    it('should get a valid capital value', () =>
      agent.get('/api/countries/ARG').expect(function(res) {     
        res.body.capital.should.equal('Buenos Aires'); 
      })
    );
    it('should get a valid continent value', () =>
      agent.get('/api/countries/ARG').expect(function(res) {     
      res.body.continent.should.equal('Americas'); 
    })
    );
    it('should get a valid subregion value', () =>
      agent.get('/api/countries/ARG').expect(function(res) {     
      res.body.subregion.should.equal('South America'); 
    })
    );
  });



});
