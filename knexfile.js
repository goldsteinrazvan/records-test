module.exports = {

    client: 'mysql',
    connection: {
      host:     process.env.RDS_HOSTNAME,
      database: process.env.RDS_DB_NAME,
      user:     process.env.RDS_USERNAME,
      password: process.env.RDS_PASSWORD,
      charset: 'utf8mb4'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }

};
