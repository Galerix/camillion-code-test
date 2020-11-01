const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect
chai.use(chaiHttp)

let server

describe('first test group', () => {
    beforeEach(() => {
        server = require('../index')
    }),

        afterEach((done) => {

            // UPDATE DON'T CLOSE THE SERVER

            delete require.cache[require.resolve('../index')]
            done()

            //server.close( () => {
            //   delete require.cache[require.resolve( './server' )]
            //   done()
            //})      
        }),

        it('should respond 1', (done) => {
            chai.request(server)
                .get('/inc')
                .set('Connection', 'close')
                .end((err, res) => {
                    expect(res.text).to.be.equal('1')
                    done()
                })
        }),

        it('should respond 1', (done) => {
            chai.request(server)
                .get('/inc')
                .set('Connection', 'close')
                .end((err, res) => {
                    expect(res.text).to.be.equal('1')
                    done()
                })
        })
})