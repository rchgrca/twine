# Twine Coding exercise

* I used React stateless components with Redux to create an architecture that demonstrates a more
 modern approach to building modern web applications.  

# Install
```
$ git clone https://github.com/rchgrca/twine <my-directory>
$ cd <my-directory>
$ npm install && npm start
```

# View

* http://localhost:3000


# Test

```
$ npm run test
$ npm run test:watch
```

# Lint

```
$ npm run lint
```

# Details

* Unread and Read emails are sorted by most recent
* Click on "Mark as Read", sends async request, on success, it toggles the "unread" property to
false, places the message in the Unread section
* Click on "Mark as Unread", sends async request, on success, it toggles the "unread" property to
true, places the message in the Read section
* Email body section in both sections can accomodate two lines before an ellipsis is used
Truncation done with javascript.  Pure CSS truncation works only on one line and other solutions
are not cross-browser compatible
* Malformed data:
  * one email message has a date listed as null.  moment() returns "Invalid Date", detection is logged to
  the console.  The null is discarded and "Invalid Date" displays on the page
  * one email address is missing an "@".  Detection is logged to the console and the address is not displayed
* Tests can be found in /tests/routes/Email/components/Email.spec.js
* All lint tests pass
