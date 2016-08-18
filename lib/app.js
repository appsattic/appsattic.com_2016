// --------------------------------------------------------------------------------------------------------------------

// core
var path = require('path')

// npm
var express = require('express')
var favicon = require('serve-favicon')
var morgan = require('morgan')

// --------------------------------------------------------------------------------------------------------------------

var isDev  = process.env.ENV === 'dev'
var isProd = process.env.ENV === 'prod'

var app = express()

// templates
app.set('views', path.join(__dirname, '..', 'views'))
app.set('view engine', 'pug')
if ( isDev ) {
  app.locals.pretty = true
}

// middleware
app.use(morgan(isProd ? 'combined' : 'dev'))

// static files 
app.use('/s/', express.static(path.join(__dirname, '..', 'public', 's')))
app.use(favicon(__dirname + '/../public/favicon.ico'))

// routes

app.get('/', function(req, res, next) {
  res.render('index', { title: 'Apps Attic Ltd' })
})

app.get('/about', function(req, res, next) {
  res.render('about', { title: 'About AppsAttic' })
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// development error handler - will print stacktrace
if ( isDev ) {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500)
    res.render('error', {
      msg : err.message,
      err : err,
    })
  })
}

// production error handler - no stacktraces leaked to user
if ( isProd ) {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500)
    res.render('error', {
      msg : err.message,
      err : {},
    })
  })
}

// --------------------------------------------------------------------------------------------------------------------

module.exports = app

// --------------------------------------------------------------------------------------------------------------------
