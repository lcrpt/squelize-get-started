const Sequelize = require('sequelize');

const connection = new Sequelize('sequelize_get_started', 'root', 'root', {
  host: 'localhost',
  port: '8889',
});

const startsWithUpper = (bodyVal) => {
  const first = bodyVal.charAt(0);
  const startsWithUpper = first === first.toUpperCase();

  if (!startsWithUpper) {
    throw new Error('First letter must be a uppercase letter.');
  }
}

const Article = connection.define('article', {
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
  timestamps: false,
});

connection
  .sync({
    force: true,
  })
  .then(() => {
    Article.create({
      slug: "kickStation-first-podcast",
      title: "KickStation podcast",
      body: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor",
    })
    .then(() => {
      Article.findAll().then((articles) => {
        console.log('findAll length -> ', articles.length);
      });
      Article.findById('kickStation-first-podcast').then((article) => {
        console.log('findById -> ', article.dataValues);
      });
    });
  })
  .catch((err) => {
    console.error(err);
  });
