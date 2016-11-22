const Sequelize = require('sequelize');

const connection = new Sequelize('sequelize_get_started', 'root', 'root', {
  host: 'localhost',
  port: '8889',
});

const Article = connection.define('article', {
  title: {
    type: Sequelize.STRING,
    unique: true,
    allownull: false,
  },
  body: {
    type: Sequelize.TEXT,
    defaultValue: 'no body set',
  },
}, {
  timestamp: false,
});

connection.sync().then(() => {
  Article.findAll().then((articles) => {
    console.log(articles.length);
  })
}).catch((err) => {
  console.error(err);
});

// Article.create({
//   title: "KickStation first podcast",
//   body: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
// });
// Article.findById(1).then((article) => {
//   console.log(article.dataValues);
// })
