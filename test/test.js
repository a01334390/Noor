// test/test.js
// Declare node environment
process.env.NODE_ENV = "test"
const chai = require("chai")
const chaihttp = require("chai-http")
chai.use(chaihttp)

var app = require("..")
const expect = chai.expect
const assert = chai.assert


//Start building the tests
describe('Express Routes', function () {
    describe('Homepage responds correctly', function () {
        it('responds with status 200', function (done) {
            chai.request(app)
                .get('/')
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    done()
                })
        })

        it('responds with status 404 for everything else', function (done) {
            chai.request(app)
                .get('/foo/bar')
                .end(function (err, res) {
                    expect(res).to.have.status(404);
                    done()
                })
        })
    })
})