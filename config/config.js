require('dotenv').config();

module.exports = {
    database: process.env.DBdatabase,
    host: process.env.DBhost,
    username: process.env.DBusername,
    password: process.env.DBpassword,
    port: process.env.DBport,
    dialect: process.env.DBdialect
};
