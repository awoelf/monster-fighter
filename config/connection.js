const Sequelize = require('sequelize');
require('dotenv').config();

var sequelize;

if(process.env.DB_URL)
{
    sequelize = new Sequelize(process.env.DB_URL);
} else {
    sequelize = new Sequelize(
        process.env.DB_NAME,
        process.env.DB_USER,
        process.env.DB_PW,
        {
            host: 'localhost',
            dialect: 'mysql',
            port: '3301',
            pool: {
                acquire: 1000000
            }
        }
    );
}
module.exports = sequelize;