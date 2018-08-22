//knex
var knex = require('knex')({
        client   : 'mysql',
            connection : {
                        host     : process.env.RDS_HOSTNAME,
                                user     : process.env.RDS_USERNAME,
                                        password : process.env.RDS_PASSWORD,
                                                database : process.env.RDS_DB_NAME,
                                                        charset  : 'utf8mb4'
                                                                }
})
//knex end

//testing mysql connection at the start of the app
knex.raw( " SELECT 1+1 AS solution" )
.then( ()=>{
    console.log("CONNECTION TO DATABASE OK")
}) 
.catch( ()=>{
    console.log("CANNOT CONNECT TO DATABASE")
}).toString()

//loading bookshelf

var bookshelf = require('bookshelf')(knex)

//enable pagination
bookshelf.plugin('pagination')

module.exports.db = knex
module.exports.orm = bookshelf
