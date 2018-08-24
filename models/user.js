var connection = require('../connections/db-connect');

var User = connection.orm.Model.extend({
    tableName: 'users'
})

User.prototype.toPublic = function(){
    return { id: this.get('id'), email: this.get('email'), username: this.get('username'), password: this.get('password'), isAdmin: this.get('isAdmin')}
}

module.exports = User