var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy

var init = require('./passport')

var connection = require('../connections/db-connect')
var knex = connection.db

var authHelpers = require('./auth_helpers')

var options = {}

init()

passport.use(new LocalStrategy(options, (username, password, done)=>{
    knex('users').where({username}).first()
        .then( (user) =>{
            if( !user ){
                return done(null, false)
            }
            if( !authHelpers.compare(password, user.password) ){
                return done(null, false)
            } else {
                return done(null, user)
            }
        })
        .catch( (err) =>{
            return done(err)
        })
}))

module.exports = passport