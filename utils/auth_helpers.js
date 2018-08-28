var bcrypt = require('bcrypt')

function comparePass(userPass, databasePass){
    return bcrypt.compareSync(userPass, databasePass)
}

function loginRequired(req, res, next){
    if ( !req.user ){
        return res.status(401).send({"status":"Please log in"})
    }

    return next()
}

function loginRedirect(req, res, next){
    if(req.user){
        return res.status(401).send({ "status": "You are already logged in" })
    }
    
    return next()
}

module.exports.compare = comparePass
module.exports.loginRequired = loginRequired
module.exports.loginRedirect = loginRedirect