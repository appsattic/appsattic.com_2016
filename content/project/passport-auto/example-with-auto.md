Let's take you on a journey and show you how to create a fully-fledged server using Passport and Passport Auto.

```js
// ----------------------------------------------------------------------------

"use strict"

// core
const http = require('http')

// npm
const express = require('express')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const passport = require('passport')
const passportAuto = require('../')

// ----------------------------------------------------------------------------
// setup passport

const baseUrl = process.env.BASE_URL

const provider = {
  twitter : {
    consumerKey    : process.env.TWITTER_CONSUMER_KEY,
    consumerSecret : process.env.TWITTER_CONSUMER_SECRET,
  },
  google : {
    clientID       : process.env.GOOGLE_CLIENT_ID,
    clientSecret   : process.env.GOOGLE_CLIENT_SECRET,
    opts           : { scope : [ 'profile' ] },
  },
  facebook : {
    clientID       : process.env.FACEBOOK_CLIENT_ID,
    clientSecret   : process.env.FACEBOOK_CLIENT_SECRET,
  },
  github : {
    clientID       : process.env.GITHUB_CLIENT_ID,
    clientSecret   : process.env.GITHUB_CLIENT_SECRET,
  },
}
const providerNames = Object.keys(provider)

// console.log('provider:', provider)
const authMiddleware = passportAuto(passport, baseUrl, provider)

// ----------------------------------------------------------------------------
// the app

const app = express()

app.use(morgan('dev'))
app.use(cookieParser())
app.use(session({
  resave            : false,
  saveUninitialized : false,
  secret            : 'secret',
}))
app.use(passport.initialize())
app.use(passport.session())

// Note: Lots of output in this function is subject to XSS, so please don't do this.
app.get('/', (req, res) => {
  // see if the user is logged in
  var html = []
  if ( req.user ) {
    html.push('provider=' + req.user.provider)
    html.push('id=' + req.user.id)
    html.push('name=' + req.user.displayName)
    html.push('<a href="/logout">Log Out</a>')
    return res.send(html.join('<br>'))
  }

  providerNames.forEach((providerName) => {
    if ( provider[providerName] ) {
      html.push('<li><a href="/auth/' + providerName + '">Sign in with ' + providerName + '</a></li>')
    }
    else {
      html.push('<li>' + providerName + ' is not set up</li>')
    }
  })
  res.send('<ul>' + html.join('\n') + '</ul>')
})

app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
})

// deals with both `/auth/provider` and `/auth/provider/callback`
app.use('/auth', authMiddleware)

// ----------------------------------------------------------------------------
// the webserver

const port = process.env.PORT
const server = http.createServer()
server.on('request', app)
server.listen(port, () => {
  console.log('Server listening on %s', baseUrl)
})

// ----------------------------------------------------------------------------
```
