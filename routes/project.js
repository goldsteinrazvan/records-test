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

router.put('/projects/:id', (req, res) =>{
    User.where( {id: req.query.user_id} ).fetch()
    .then( (user) =>{
        if( !user ){
            throw NormalError.create('Error: could not get user')
        }

        var info = {}

        if(req.body.name){
            info.name = req.body.name
        }

        if(req.body.description){
            info.description = req.body.description
        }

        return Project.where( {id: req.params.id, user_id: req.query.user_id} ).save( info, {patch:true} ) 
    })
    .then( (project) =>{
        if( !project ){
            throw NormalError.create('Error: could not find project')
        }
        res.send('Project updated')
    })
    .catch( (reason) =>{
        if( reason.send_message )
        {
            res.status(500).send({errors:reason.message})
            return
        }

        console.log('Failed to update project')
        console.log(reason)
        res.status(500).send({'errors':[{'msg':'Updating project failed. Try again.'}]})
    })
})

router.get('/projects', (req, res)=>{
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
    User.where( {id: req.query.user_id} ).fetch()
    .then( (user) =>{
        if( !user ){
            throw NormalError.create('Error: could not get user')
        }
        var isAdmin = user.get("isAdmin")

        if(isAdmin){
            return Project.where( {id: req.params.id} ).fetch()
        }

        return Project.where( {id: req.params.id, user_id: req.query.user_id} ).fetch()
    })
    .then( (project) =>{
        if( !project ){
            throw NormalError.create('Error: could not find project')
        }
        res.send(project)
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

router.delete('/projects/:id', (req, res) =>{
    User.where( {id: req.query.user_id} ).fetch()
    .then( (user) =>{
        if( !user ){
            throw NormalError.create('Error: could not get user')
        }

        var isAdmin = user.get("isAdmin")

        if(isAdmin){
            return Project.where( {id: req.params.id} ).destroy()
        }

        return Project.where( {id: req.params.id, user_id: req.query.user_id} ).destroy()
    })
    .then( (project) =>{
        if( !project ){
            throw NormalError.create('Error: could not find project')
        }
        res.send('Project Deleted')
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

module.exports = router