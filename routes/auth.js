var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt')

var User = require('../models/user');

router.post('/register', (req, res)=>{
    res.send('OK')
})

module.exports = router