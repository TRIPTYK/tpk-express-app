/*global describe it assert*/
var assert = require('chai').assert;
var api = require('supertest').agent("http://localhost:3000");
describe('API SERVER', function() {
    describe('/', function() {
        it("Home Should give a 404", function(done) {
            api.get('/')
                .expect(404)
                .end(function(err, res) {
                    assert.equal(res.status, 404, res.status + " sould equal 404");
                    done();
                });
        });
    });
    describe('/api', function() {
        it("Home Should give a 404", function(done) {
            api.get('/api')
                .expect(404)
                .end(function(err, res) {
                    assert.equal(res.status, 404, res.status + " sould equal 404");
                    done();
                });
        });
    });

    describe('/api/clients', function() {
        it("Home Should give a json with an array", function(done) {
            api.get('/api/clients')
                .expect(200)
                .expect("Content-type", /json/)
                .end(function(err, res) {
                    assert.isArray(res.body);
                    done();
                });
        });
    });
});