When adding a new provider using Passport Auto, all you need to do is add a new provider option to the setup function.

For example, if you are currently using Facebook auth, and you add Twitter auth:

```js
const provider = {
  facebook : { ... },
  twitter : {
    consumerKey    : '...',
    consumerSecret : '...',
  },
}
```

If doing this manually, you'd have to make sure to:

```js
// Require passport-twitter:
const passportTwitter = require('passport-twitter')

// Setup a strategy, making sure to:
// * set up the correct 'callbackURL', including the protocol, host, port and path
// * pass in the correct 'lookUpUser' function, making sure you have the correct argument names
passport.use(new TwitterStrategy({
    consumerKey: '...',
    consumerSecret: '...',
    callbackURL: "http://127.0.0.1:3000/auth/twitter/callback"
  },
  function(token, tokenSecret, profile, cb) {
    User.findOrCreate({ twitterId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));

// Add new routes to start and finish the authentication process, making sure to:
// * add a route to `/auth/twitter`
// * redirect to the correct place on failure
// * add a route to `/auth/twitter/callback`
// * redirect to the correct place on success
app.get('/auth/twitter',
  passport.authenticate('twitter'));

app.get('/auth/twitter/callback',
  passport.authenticate('twitter', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });
```

As you can see, adding a new provider using Passport Auto is a lot simpler.

(Ends)
