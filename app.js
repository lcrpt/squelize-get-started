const Sequelize = require('sequelize');
const connection = require('./db-connection');
const Articles = require('./models/article');
const Users = require('./models/users');

connection
  .sync({
    force: true,
    logging: console.log,
  })
  .then(() => {
    Users.create({
      username: 'leopold',
      password: 'myPassword',
    }).then(() => {
      const req = {
        body: {
          approved: true,
          slug: "kickStation-first-podcast",
          title: "KickStation podcast",
          body: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor",
        }
      }

      Articles.create(req.body, {
        fields: ['title', 'body', 'slug']
      }).then((insertedArticle) => {
        console.log(insertedArticle.dataValues);
      })

      .then(() => {
        Articles.bulkCreate([
          {
            approved: true,
            slug: "KickStatisdfnio--11111111",
            title: "DfdKickStatin podcast",
            body: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor",
          },
          {
            approved: true,
            slug: "kickStatin-22222",
            title: "KickStatisdfn podcast",
            body: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor",
          }
        ], {
          validate: true,
          ignoreDuplicates: true
        })
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
