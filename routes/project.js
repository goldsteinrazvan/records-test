var express = require('express');
var router = express.Router();

var connection = require('../connections/db-connect')
var NormalError = require('../utils/error')

var Project = require('../models/project')
var User = require('../models/user')

router.post('/projects', (req, res)=>{
    req.checkBody('name', 'Missing project name').notEmpty()
    req.checkBody('description', 'Missing project description').notEmpty()
    req.checkBody('user_id', 'Missing user id').notEmpty()
    req.getValidationResult().then( (result) =>{
        if( !result.isEmpty() ){
            throw NormalError.create('Error: Project not created')
        }

        User.where( {id: req.body.user_id} ).fetch()
            .then( (user) =>{
                if( !user ){
                    throw NormalError.create('Error: could not get user')
                }

                var info = {}
                info.name = req.body.name
                info.description = req.body.description
                info.user_id = req.body.user_id

                return Project.forge(info).save()
            })
            .then( (result) =>{
                if( !result ){
                    throw NormalError.create('Error: could not create project')
                }

                res.send('Project Created')
            })
            .catch( (reason) =>{
                if( reason.send_message )
                {
                    res.status(500).send({errors:reason.message})
                    return
                }
    
                console.log('Adding project failed')
                console.log(reason)
                res.status(500).send({'errors':[{'msg':'Failed to create project. Try again.'}]})
            })

    })
    
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