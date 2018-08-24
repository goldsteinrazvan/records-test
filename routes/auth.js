var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt')

var connection = require('../connections/db-connect')
var knex = connection.db

var NormalError = require('../utils/error')

router.post('/register', (req, res)=>{
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

module.exports = router