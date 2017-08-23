import EmailRoute from 'routes/Email'

describe('(Route) Email', () => {
  it('returns a route configuration object', () => {
    expect(typeof EmailRoute({})).to.equal('object')
  })

  it('has a path \'email\'', () => {
    expect(EmailRoute({}).path).to.equal('email')
  })
})
