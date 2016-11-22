const Sequelize = require('sequelize');
const bcrypt = require('bcryptjs');
const connection = require('../db-connection');

const Users = connection.define('users', {
  username: Sequelize.TEXT,
  password: Sequelize.TEXT,
}, {
  hooks: {
    afterValidate: (user) => {
      user.password = bcrypt.hashSync(user.password, 8);
    },
  },
});

module.exports = Users;
