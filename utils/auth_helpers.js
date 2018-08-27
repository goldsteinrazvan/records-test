var bcrypt = require('bcrypt')

function comparePass(userPass, databasePass){
    return bcrypt.compareSync(userPass, databasePass)
}

module.exports.compare = comparePass