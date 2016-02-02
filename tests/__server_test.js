/*global describe it assert*/
var chai = require('chai');
//var chaiHttp = require('chai-http');
//chai.use(chaiHttp);
//var server = require('../server/server');
var should = require('chai').should();
var assert = chai.assert;

var request = require('supertest')
  , express = require('express');
var app = express();





describe('Array', function() {
    describe('#indexOf()', function() {

  		// it('List all clients', function(done) {
		//   chai.request(server)
		//     .get('/api/clients')
		//     .end(function(err, res){
		//       res.should.have.status(200);
		//       res.should.be.json;
		//       done();
		//     });
		// });

		// it('Create new client', function(done) {
		//   chai.request(server)
		//     .post('/api/clients')
		//     .send({'name': 'Test Insert'})
		//     .end(function(err, res){
		//       res.should.have.status(200);
		//       res.should.be.json;
		//       res.body.should.be.a('object');
		//       res.body.should.have.property('name');
		//       res.body.name.should.equal('Test Insert');
		//       done();
		//     });
		// });

		it('Get all clients', function(done) {
			request(app)
			.get('/api/clients')
            .expect('Content-Type', "text/html; charset=utf-8")
			.expect(200, done);	
		});
		
        
    });
});