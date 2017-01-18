const httpMocks = require('node-mocks-http')
const chai = require('chai')
const expect = require('chai').expect
const chaiAsPromised = require('chai-as-promised')
const APIMiddleware = require('../').APIMiddleware

chai.use(chaiAsPromised)

describe('API middleware', () => {
  const apps = {
    testApp: () => (
      Promise.resolve({
        html: '<html>testApp</html>',
        state: { state: 'testApp' },
        scripts: ['testApp.js'],
        styles: ['testApp.css'],
      })
    ),
    otherApp: () => (
      Promise.resolve({
        html: '<html>otherApp</html>',
        styles: ['otherApp.css'],
      })
    ),
  }

  let okReq
  let failReq
  let res

  beforeEach(() => {
    okReq = httpMocks.createRequest({
      method: 'POST',
      body: {
        app: 'testApp',
      },
    })
    failReq = httpMocks.createRequest({
      method: 'POST',
      body: {
        app: 'appNotDefined',
      },
    })
    res = httpMocks.createResponse()
  })

  it('should have a 404 status if the app is not valid', () => (
    expect(APIMiddleware({ apps })(failReq, res)).to.be.fulfilled.then(() => {
      expect(res.statusCode).to.equal(404)
    })
  ))

  it('should have a 200 status if the app is valid', () => (
    expect(APIMiddleware({ apps })(okReq, res)).to.be.fulfilled.then(() => {
      expect(res.statusCode).to.equal(200)
    })
  ))

  it('should respond the app html', () => (
    expect(APIMiddleware({ apps })(okReq, res)).to.be.fulfilled.then(() => (
      expect(JSON.parse(res._getData()).response.html).to.equal('<html>testApp</html>')
    ))
  ))

  it('should respond the app state', () => (
    expect(APIMiddleware({ apps })(okReq, res)).to.be.fulfilled.then(() => {
      expect(JSON.parse(res._getData()).response.state).to.deep.equal({ state: 'testApp' })
    })
  ))

  it('shoud respond the app scripts', () => (
    expect(APIMiddleware({ apps })(okReq, res)).to.be.fulfilled.then(() => (
      expect(JSON.parse(res._getData()).response.scripts).to.contain('testApp.js')
    ))
  ))

  it('shoud respond the app styles', () => (
    expect(APIMiddleware({ apps })(okReq, res)).to.be.fulfilled.then(() => (
      expect(JSON.parse(res._getData()).response.styles).to.contain('testApp.css')
    ))
  ))
})
