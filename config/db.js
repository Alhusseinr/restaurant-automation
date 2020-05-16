const knex = require("knex");
const { DBhost, DBusername, DBport, DBpassword, DBdatabase } = process.env;
module.exports = db = knex({
    client: 'pg',
    connection: {
        host: DBhost,
        user: DBusername,
        port: DBport,
        password: DBpassword,
        database: DBdatabase
    }
});
