import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path : 'email',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const Email = require('./containers/EmailContainer').default
      const reducer = require('./modules/email').default

      /*  Add the reducer to the store on key 'counter'  */
      injectReducer(store, { key: 'messages', reducer })

      /*  Return getComponent   */
      cb(null, Email)

    /* Webpack named bundle   */
    }, 'email')
  }
})
