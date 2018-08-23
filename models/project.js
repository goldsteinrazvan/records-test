var connection = require('../connections/db-connect');

var User = require('./user.js')

var Project = connection.orm.Model.extend({
    tableName: 'projects',
    user(){
        return this.belongsTo(User, 'user_id')
    }
})

Project.prototype.toPublic = function(){
    return { id: this.get('id'), name: this.get('name'), description: this.get('description'), user_id: this.get('user_id')}
}