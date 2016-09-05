This page walks you through a comparison of using regular PassportJS and using Passport Auto with PassportJS.

Our example will use both Twitter and GitHub login.

## Requires ##

[Passport Auto](https://www.npmjs.com/package/passport-auto) is a one-stop shop to allow you to set up
[PassportJS](http://passportjs.org/) authentication strategies with ease.

## The Regular Passport Way ##

From the PassportJS docs, you need to do three things to configure:

Three pieces need to be configured to use Passport for authentication:

1. Authentication strategies
2. Application middleware
3. Sessions (optional)

... but let's just expand on that to discuss a few other things. Here's my list:

1. authentication strategies
2. application middleware (ie. `app.use(passport.initialize())`
3. sessions (ie. `app.use(passport.session())`
4. your `/auth` handlers, two for every provider: `/auth/provider` and `/auth/provider/callback`
5. two functions to serialize/deserialize to your session: `serializeUser` and `deserializeUser`
6. a function which inserts/retrieves a user from your datastore

Whilst points (2) and (3) are exactly the same with Passport Auto, other points are easier:

Let's consider each point for how Passport Auto helps:

1. can easily set up by just passing a provider config to `passportAuto()`
2. same
3. same
4. just do `app.use(authMiddleware)` instead of 2 routes for every provider
5. automatic for dev, same for production
6. automatic for dev, same for production

(Ends)

# Passport Auto #
