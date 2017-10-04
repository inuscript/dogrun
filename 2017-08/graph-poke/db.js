const knex = require("knex")
const db = knex({
  client: 'sqlite3',
  connection: {
    filename: './pokedex.sqlite'
  },
  useNullAsDefault: true
})

module.exports = db