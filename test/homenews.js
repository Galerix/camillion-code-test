//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let HomeNews = require('../models/homenews');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();


chai.use(chaiHttp);
//Our parent block
describe('Home News', () => {
    beforeEach((done) => { //Before each test we empty the database
        HomeNews.deleteMany({}, (err) => {
            done();
        });
    });
    /*
      * Test the /POST route
      */
    describe('/POST news', () => {
        it('it should not POST a news without name field', (done) => {
            let news = {
                text: "Example new",
            }
            chai.request(server)
                .post('/api/news')
                .send(news)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('error');
                    res.body.should.have.property('errorMessage').eql("You must send a text and the name of the news.");
                    done();
                });
        });
        it("it should not POST a news if you don't have ROLE_ADMIN", (done) => {
            let news = {
                name: "Example new",
                text: "Example new",
            }
            chai.request(server)
                .post('/api/news')
                .send(news)
                .end((err, res) => {
                    res.should.have.status(401);
                    res.body.should.be.a('object');
                    res.body.should.have.property('error');
                    res.body.should.have.property('errorMessage').eql("You must be an admin to post news.");
                    done();
                });
        });
        it("it should POST a news", (done) => {
            let news = {
                name: "Example new",
                text: "Example new",
            }
            chai.request(server)
                .post('/api/news')
                .set('Authorization', 'admin')
                .send(news)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('homeNews');
                    res.body.homeNews.should.have.property('text');
                    res.body.homeNews.should.have.property('name');
                    res.body.homeNews.should.have.property('user');
                    res.body.homeNews.should.have.property('created_at');
                    done();
                });
        });

    });

});