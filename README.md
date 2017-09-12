# Twine Coding exercise

* Create a simple email application with React stateless components and Redux using an architecture that demonstrates a more modern approach to building complex web applications.  

# Install
```
$ git clone https://github.com/rchgrca/twine <my-directory>
$ cd <my-directory>
$ npm install && npm start
```

# View

* http://localhost:3000


# Tests
  * All tests pass
  * Location: /tests/routes/Email/components/Email.spec.js
```
$ npm run test
$ npm run test:watch
```

# Lint
  * All tests pass
```
$ npm run lint
```

# Tasks Completed (Required)

* Unread and Read emails are sorted by most recent
* Click on "Mark as Read", sends async request, on success, it toggles the "unread" property to
false, places the message in the Unread section
* Click on "Mark as Unread", sends async request, on success, it toggles the "unread" property to
true, places the message in the Read section
* Email body section in both sections can accommodate two lines before an ellipsis is used
Truncation done with javascript.  Pure CSS truncation works only on one line and other solutions
are not cross-browser compatible
* Malformed data:
  * one email message has a date listed as null.  moment() returns "Invalid Date", detection is logged to
  the console.  The null is discarded and "Invalid Date" displays on the page
  * one email address is missing an "@".  Detection is logged to the console and the address is not displayed
* Implemented unit tests

# Tasks Completed (Extra)

* Implemented Responsive Web Design compatibility
  * tested on Chrome developer tools device simulator
  * Galaxy S5, Nexus 5X, Nexus 6P, iPhone5, iPhone6, iPhone6 Plus, iPad, iPad Pro
* Click on "Delete", sends async request, on success, it filters out the specific email id and returns the request
* Implemented a "functional CSS" approach using "TachyonsCSS"
  * creates easier to maintain CSS
    * immutable:  only one CSS property: value pair per classname, insures low specifity with zero minimal side-effects
    * composable: string classnames together in "className" attribute
    * classnames are put into JavaScript strings kept in a separate file to avoid "polluting" the "className" attribute
    * development/debugging is done in HTML tag attributes only only
    * minimal developer written CSS

# Initialize React
  * index.html, id="root"
  * main.js, build parent component <App />, pass in props:  store, routes
    * store (application state)
    * routes (get components that props will be sent to based on route, "/" in this case)
      * via function getComponent(), see React Dev Tool in App component
      * example: '/' route sends props to 'Email'
      * example:  "/contacts" route would be set up to send props to 'Contacts' component (if created)
    * src/components/App
      * wrapper 'Provider' enables redux store to use function connect() to map state to props
      * 'Router' passes store and routes data (containing email data) to its child components
        * /src/layouts/PageLayout/PageLayout.js:  'PageLayout' sends props child components:  Email in this case

# Initialize Redux
  * store/createStore.js
    * creates Redux store, dispatch loadEmails() to populate store
  * routes/Email/index.js
    * adds the emailReducer to the store and maps to EmailContainer
    * emailReducer is a function that updates store and returns result props to components
  * routes/index.js
    * injects store into indexRoute
    * when a user goes to '/', inject the store into component container
  * containers/EmailContainer.js
    * maps store data and functions to React Component props via the connect() function
  * store/reducers.js
    * replaces reducer function with new one from newly dispatched action
    * show basic redux reducer (switch) http://redux.js.org/docs/basics/Reducers.html
  * modules/email.js
    * redux/INIT action
  * components/Email.js
    * presentation component, receives props to Email components (initialState = [])
  * modules/email.js
    * dispatch action LOAD_EMAILS_SUCCESS
    * calls reducer which updates/populates store with API response
    * passes store data as props to presentation component components/Email.js
  * components/Email.js
    * populates component props with new messages state, markRead, markUnread

# Mark Read
  * modules/email.js
    * dispatched action MARK_READ
    * calls reducer which updates/populates store with API response
    * passes store data as props to presentation component
  * components/Emails.js
    * updates components props with new messages state, markRead, markUnread

# Mark Unread
  * modules/email.js
    * dispatched action MARK_READ
    * calls reducer which updates/populates store with API response
    * passes store data as props to presentation component
  * components/Emails.js
    * updates components props with new messages state, markRead, markUnread

# Requirements
  * separate Unread and Read emails and sort them by most recent
    * make API request to load email messages and place in Redux data store
      * createStore.js
        * store.dispatch(loadEmails())
      * modules/email.js
        * loadEmails()
        * loadEmailsSuccess()
    * convert email dates to milliseconds
      * function convertDateToMs(messages)
    * separate email objects:  unread vs. unread
      * function getMail(messages, boolean)
        * boolean:  true = Unread, false = read
      * sort emails by most recent first
      * use array sort and pass in a "compareFunction" to sort on a specific key
    * convert email dates back to formatted form
      * function convertDateToFormat()
  * Click on "Mark as Read", sends async request, on success, it toggles the "unread" property to
    * false, places the message in the Unread section
  * Click on "Mark as Unread", sends async request, on success, it toggles the "unread" property to
    * true, places the message in the Read section
  * Email body section in both sections can accommodate two lines before an ellipsis is used
  * Truncation done with javascript.  Pure CSS truncation works only on one line and other solutions are not cross-browser compatible
  * Malformed data:
    * one email message has a date listed as null.  moment() returns "Invalid Date", detection is logged to the console.  The null is discarded and "Invalid Date" displays on the page
    * one email address is missing an "@".  Detection is logged to the console and the address is not displayed

# Cross Origin
  * used a CORS proxy to get past 'Access-Control-Allow-Origin' error
    * https://cors-anywhere.herokuapp.com/<endpoint>
