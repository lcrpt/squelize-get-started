const Sequelize = require('sequelize');

const connection = new Sequelize('sequelize_get_started', 'root', 'root', {
  host: 'localhost',
  port: '8889',
});

const Article = connection.define('article', {
  slug: {
    type: Sequelize.STRING,
    primaryKey: true,
  },
  title: {
    type: Sequelize.STRING,
    unique: true,
    allownull: false,
  },
  body: {
    type: Sequelize.TEXT,
  },
}, {
  timestamps: false,
});

connection.sync({
  force: true,
}).then(() => {
  Article.create({
    slug: "kickStation-first-podcast",
    title: "KickStation first podcast",
    body: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor",
  }).then(() => {
    Article.findAll().then((articles) => {
      console.log('findAll length -> ', articles.length);
    });
    Article.findById('kickStation-first-podcast').then((article) => {
      console.log('findById -> ', article.dataValues);
    });
  });
}).catch((err) => {
  console.error(err);
});
