
exports.up = function(knex, Promise) {
    return knex.schema.withSchema(process.env.RDS_DATABASE).createTable('projects', function(table){
        table.increments('id');
        table.timestamps(true,true);

        table.string('name', 250);
        table.text('description');
        //foreign key
        table.integer('user_id').unsigned().index().references('id').inTable('users');

    })
};

exports.down = function(knex, Promise) {
    return knex.schema.withSchema(process.env.RDS_DATABASE).dropTable('projects');
};
