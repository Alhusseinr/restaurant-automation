const path = require('path');

module.exports = {
    "Config" : path.resolve('./config', 'config.js'),
    "modules-path": path.resolve('./models'),
    "seeders-path": path.resolve('./seeders'),
    "migrations-path": path.resolve('./migrations')
};
