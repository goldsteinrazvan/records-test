var express = require('express');
var router = express.Router();

router.get( '/', (req, res)=>{
    res.send('API v1 endpoint')
})

module.exports = router;
