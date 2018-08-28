var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt')

var connection = require('../connections/db-connect')
var knex = connection.db

var authHelpers = require('../utils/auth_helpers')
var passport = require('../utils/local')

var NormalError = require('../utils/error')

router.post('/register', authHelpers.loginRedirect, (req, res, next)=>{
    req.checkBody('username', 'Missing user name').notEmpty()
    req.checkBody('email', 'Missing email address').notEmpty()
    req.checkBody('password', 'Missing password').notEmpty()
    req.getValidationResult().then( (result) =>{
        if( !result.isEmpty() )
        {
            throw NormalError.create( result.array() )
        }

        var info = {}

        var salt = bcrypt.genSaltSync()
        var hash = bcrypt.hashSync(req.body.password, salt)

        info.username = req.body.username
        info.email = req.body.email
        info.password = hash

        return knex('users').insert([info])

    })
    .then( (result) =>{
        if( !result ){
            throw NormalError.create('Error: User not created')
        }

        res.send('User created')
    })
    .catch( (reason) =>{
        if( reason.send_message )
        {
        	res.status(500).send({errors:reason.message})
        	return
        }

        console.log('Adding user failed')
        console.log(reason)
        res.status(500).send({'errors':[{'msg':'Adding user failed. Try again.'}]})
    })
   
})

router.post('/login', authHelpers.loginRedirect, (req, res, next) =>{
    passport.authenticate('local', (err, user, info) =>{
        if( err ){
            res.status(500).send('error')
        }

        if( !user ){
            res.status(404).send('User not found')
        }

        if(user){
            req.logIn(user, (err) =>{
                if(err){
                    res.status(500).send('error')
                }

                res.status(200).send('success')
            })
        }

    })(req, res, next)
})

module.exports = router