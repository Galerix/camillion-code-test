let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;

const conn = require('../../../index.js');

chai.use(chaiHttp);
const url = 'http://localhost:3800/api';


describe('POST /news', () => {
    before((done) => {
        conn.connect()
            .then(() => done())
            .catch((err) => done(err));
    })
    after((done) => {
        conn.close()
            .then(() => done())
            .catch((err) => done(err));
    })
    it('Should insert a news', (done) => {
        chai.request(url)
            .post('/news')
            .send({ name: 'NEWS NAME', text: 'NEWS TEXT' })
            .then((res) => {
                expect(res).to.have.status(200);
                done();
            })
            .catch((err) => done(err));
    })
})
