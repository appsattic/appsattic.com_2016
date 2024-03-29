// --------------------------------------------------------------------------------------------------------------------

"use strict"

// core
var path = require('path')

// npm
var express = require('express')
var favicon = require('serve-favicon')
var morgan = require('morgan')
var connectBlog = require('connect-blog')
var connectContent = require('connect-content')

// --------------------------------------------------------------------------------------------------------------------

var isDev, isProd, protocol, domain, baseUrl, ga
if ( process.env.NODE_ENV === 'production' ) {
  isDev    = false
  isProd   = true
  protocol = 'https'
  domain   = 'appsattic.com'
}
else {
  isDev    = true
  isProd   = false
  protocol = 'http'
  domain   = 'localhost:9055'
}
baseUrl  = protocol + '://' + domain

// blog
var blog = connectBlog({
  title       : 'AppsAttic Blog',
  description : 'Your business. Our apps.',
  contentDir  : path.join(__dirname, '..', 'blog'),
  domain      : domain,
  base        : '/blog',
})

// content
var project = connectContent({
  title      : "AppsAttic's Projects",
  contentDir : path.join(__dirname, '..', 'content', 'project'),
  template   : 'project-page',
})

var projectImagelicious = connectContent({
  title      : 'Imagelicious',
  contentDir : path.join(__dirname, '..', 'content', 'project', 'imagelicious'),
  template   : 'project-page',
})

var projectPassportAuto = connectContent({
  title      : 'Passport Auto',
  contentDir : path.join(__dirname, '..', 'content', 'project', 'passport-auto'),
  template   : 'project-page',
})

// --------------------------------------------------------------------------------------------------------------------
// the app

var app = express()

// templates
app.set('views', path.join(__dirname, '..', 'views'))
app.set('view engine', 'pug')
app.set('strict routing', true)

if ( isDev ) {
  app.locals.pretty = true
}

app.use(function(req, res, next) {
  res.locals.blog = {}
  res.locals.blog.latest = blog.latest
  res.locals.blog.posts  = blog.posts

  res.locals.isDev  = isDev
  res.locals.isProd = isProd
  res.locals.env = {
    ga : process.env.GA,
  }

  next()
})

// middleware
app.use(morgan(isProd ? 'combined' : 'dev'))

// static files 
app.use('/s/', express.static(path.join(__dirname, '..', 'public', 's')))
app.use(favicon(path.join(__dirname, '..', 'public', 'favicon.ico')))

// routes
app.get('/', function(req, res, next) {
  res.render('index', { title: 'Apps Attic Ltd' })
})

app.get('/about', function(req, res, next) {
  res.render('about', { title: 'About AppsAttic' })
})

app.get(
  '/blog',
  function(req, res) {
    res.redirect('/blog/')
  }
)

app.get(
  '/blog/',
  blog
)

app.get(
  '/blog/:path',
  blog
)

app.get(
  '/project',
  function(req, res) {
    res.redirect('/project/')
  }
)

app.get(
  '/project/',
  project
)

app.get(
  '/project/:pagename',
  project
)

function addProjectContent(name, content) {
  app.get('/project/' + name, function(req, res) {
    res.redirect('/project/' + name + '/')
  })
  app.get(
    '/project/' + name + '/',
    content
  )
  app.get(
    '/project/' + name + '/:pagename',
    content
  )
}

addProjectContent('imagelicious', projectImagelicious)
addProjectContent('passport-auto', projectPassportAuto)

// create the sitemap with the blog posts too
var sitemap = [
  baseUrl + '/',
  baseUrl + '/about',
  // baseUrl + '/projects/',
  baseUrl + '/blog/',
]
blog.posts.forEach(function(post) {
  sitemap.push(baseUrl + '/blog/' + post.name)
})
var sitemapTxt = sitemap.join('\n') + '\n'

app.get(
  '/sitemap.txt',
  function(req, res) {
    res.setHeader('Content-Type', 'text/plain')
    res.send(sitemapTxt)
  }
)

var robots = [
  'User-agent: *',
  'Allow: /',
]
var robotsTxt = robots.join('\n') + '\n'

app.get(
  '/robots.txt',
  function(req, res) {
    res.setHeader('Content-Type', 'text/plain')
    res.send(robotsTxt)
  }
)

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
