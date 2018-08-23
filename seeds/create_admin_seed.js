var bcrypt = require('bcrypt');

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      var salt = bcrypt.genSaltSync()
      var hash = bcrypt.hashSync(process.env.ADMIN_PASSWORD, salt);
      // Inserts seed entries
      return knex('users').insert([
        {email: process.env.ADMIN_EMAIL, username: process.env.ADMIN_USERNAME, password: hash, isAdmin: true}
      ]);
    });
};
