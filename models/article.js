const Sequelize = require('sequelize');
const connection = require('../db-connection');

const startsWithUpper = (bodyVal) => {
  const first = bodyVal.charAt(0);
  const startsWithUpper = first === first.toUpperCase();

  if (!startsWithUpper) {
    throw new Error('First letter must be a uppercase letter.');
  }
}

const Articles = connection.define('article', {
  slug: {
    type: Sequelize.STRING,
    primaryKey: true,
  },
  title: {
    type: Sequelize.STRING,
    unique: true,
    allownull: false,
    validate: {
      len: {
        args: [10, 150],
        msg: 'The title should have a length of 10 to 150 characters',
      },
      startsWithUpper,
    },
  },
  body: {
    type: Sequelize.TEXT,
    validate: {
      startsWithUpper,
    },
  },
}, {
  hooks: {
    beforeValidate: () => {
      console.log('### beforeValidate ###');
    },
    afterValidate: () => {
      console.log('### afterValidate ###');
    },
    beforeCreate: () => {
      console.log('### beforeCreate ###');
    },
    afterCreate: () => {
      console.log('### afterCreate ###');
    },
  },
});

module.exports = Articles;
