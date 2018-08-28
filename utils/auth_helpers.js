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

module.exports.compare = comparePass
module.exports.loginRequired = loginRequired