const Sequelize = require('sequelize');

const connection = new Sequelize('sequelize_get_started', 'root', 'root', {
  host: 'localhost',
  port: '8889',
});

module.exports = connection;
