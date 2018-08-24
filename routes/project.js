var express = require('express');
var router = express.Router();

var connection = require('../connections/db-connect')
var NormalError = require('../utils/error')

var Project = require('../models/project')
var User = require('../models/user')

router.post('/projects', (req, res)=>{
    
    res.send('ok')
})

router.get('/projects', (req, res)=>{
    var project_info = {}
   
    User.where( {id: req.query.user_id} ).fetch()
        .then( (user) =>{
            if( !user ){
                throw NormalError.create('Error: could not get user')
            }
            
            var isAdmin = user.get("isAdmin")

            if( isAdmin ){
                return Project.fetchAll()
            } else {
                return Project.where( {user_id: req.query.user_id} ).fetchAll()
            }
        })
        .then( (projects) =>{
            res.send(projects)
        })
        .catch( (reason) =>{
            if( reason.send_message )
        {
        	res.status(500).send({errors:reason.message})
        	return
        }

        console.log('Failed getting project')
        console.log(reason)
        res.status(500).send({'errors':[{'msg':'Getting project failed. Try again.'}]})
        })
})

router.get('/projects/:id', (req, res) =>{
    
})

module.exports = router