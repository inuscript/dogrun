const { Sequelize } = require("sequelize")
const sequelize = new Sequelize('database', '', '', {
  // host: 'localhost',
  dialect: 'sqlite',
  // SQLite only
  storage: 'path/to/test.sqlite'
})

sequelize.