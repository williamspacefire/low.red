const dotenv = require('dotenv');
dotenv.config({
    path: "../.env"
});

module.exports = {
    host: process.env.DB_HOST,
    database: process.env.DB,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
}