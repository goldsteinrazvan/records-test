
exports.up = function(knex, Promise) {
  return knex.schema.withSchema(process.env.RDS_DATABASE).createTable('users', function(table){
      table.increments('id');
      table.timestamps(true,true);
      table.string('email').notNullable();
      table.string('username').notNullable();
      table.string('password').notNullable();
      table.boolean('isAdmin').defaultsTo(false);
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.withSchema(process.env.RDS_DATABASE).dropTable('users');
};
