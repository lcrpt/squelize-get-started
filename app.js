const Sequelize = require('sequelize');
const connection = require('./db-connection');
const Articles = require('./models/article');
const Users = require('./models/users');

connection
  .sync({
    // force: true,
    logging: console.log,
  })
  .then(() => {
    Users.create({
      username: 'leopold',
      password: 'myPassword',
    }).then(() => {
      Articles.create({
        slug: "kickStation-first-podcast",
        title: "KickStation podcast",
        body: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor",
      })
      .then(() => {
        Articles.findAll().then((articles) => {
          console.log('findAll length -> ', articles.length);
        });
        Articles.findById('kickStation-first-podcast').then((article) => {
          console.log('findById -> ', article.dataValues);
        });
      });
    })
  })
  .catch((err) => {
    console.error(err);
  });
