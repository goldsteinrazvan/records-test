var passport = require('passport')
var connection = require('../connections/db-connect')
var knex = connection.db

module.exports = () => {
    passport.serializeUser( (user, done) =>{
        done(null, user.id)
    })

    passport.deserializeUser( (id, done) =>{
       knex('users').where(id).first()
        .then( (user) =>{
            done(null, user)
        })
        .catch( (err) =>{
            done(err, null)
        })
    })
}