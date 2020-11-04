//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let HomeNews = require('../models/homenews');
var moment = require('moment');

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
        it("it should not POST a news if you don't have logged in", (done) => {
            let news = {
                name: "Example new",
                text: "Example new",
            }
            //we don't set any authentication
            chai.request(server)
                .post('/api/news')
                .send(news)
                .end((err, res) => {
                    res.should.have.status(401);
                    res.body.should.be.a('object');
                    res.body.should.have.property('error');
                    res.body.should.have.property('errorMessage').eql("The request does not have the authentication header.");
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
                //we set user authentication
                .set('Authorization', 'user')
                .send(news)
                .end((err, res) => {
                    res.should.have.status(401);
                    res.body.should.be.a('object');
                    res.body.should.have.property('error');
                    res.body.should.have.property('errorMessage').eql("You must be an admin to post news.");
                    done();
                });
        });
        it('it should not POST a news without name field', (done) => {
            let news = {
                text: "Example new",
            }
            chai.request(server)
                .post('/api/news')
                .set('Authorization', 'admin')
                .send(news)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('error');
                    res.body.should.have.property('errorMessage').eql("You must send a text and the name of the news.");
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
    /*
      * Test the /GET route
      */
    describe('/GET news', () => {
        it("it should not GET the news if you don't have logged in", (done) => {
            chai.request(server)
            //we don't set any authentication
                .get('/api/news')
                .end((err, res) => {
                    res.should.have.status(401);
                    res.body.should.be.a('object');
                    res.body.should.have.property('error');
                    res.body.should.have.property('errorMessage').eql("The request does not have the authentication header.");
                    done();
                });
        });
        it("it should GET all the news", (done) => {
            chai.request(server)
                .get('/api/news')
                .set('Authorization', 'user')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('total').eql(0);
                    res.body.should.have.property('page').eql(1);
                    res.body.should.have.property('pages').eql(0);
                    res.body.should.have.property('homeNews');
                    res.body.homeNews.should.be.a('array');
                    res.body.homeNews.length.should.be.eql(0);
                    done();
                });
        });
        it("it should GET the news of the page 2", (done) => {
            chai.request(server)
                .get('/api/news/2')
                .set('Authorization', 'user')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('total').eql(0);
                    res.body.should.have.property('page').eql(2);
                    res.body.should.have.property('pages').eql(0);
                    res.body.should.have.property('homeNews');
                    res.body.homeNews.should.be.a('array');
                    res.body.homeNews.length.should.be.eql(0);
                    done();
                });

        });
    });

});