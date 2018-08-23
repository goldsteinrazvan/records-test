var express = require('express');
var router = express.Router();

var auth = require('./auth')
router.use( auth )

router.get( '/', (req, res)=>{
    res.send('API v1 endpoint')
})

module.exports = router;
