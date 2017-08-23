import EmailRoute from 'routes/Email'

describe('(Route) Email', () => {
  it('returns a route configuration object', () => {
    expect(typeof EmailRoute({})).to.equal('object')
  })
})
