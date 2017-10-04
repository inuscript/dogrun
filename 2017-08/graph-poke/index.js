const db = require("./db")
const fs = require("fs")
const { graphql, buildSchema } = require("graphql")

const typeDefs = fs.readFileSync("./schema.graphql").toString()

const resolers = {
  Query: {
    pokemon(id){
      return db.select().from("pokemon")
        .where(`id = ${id}`)

    }
  }
}
const schema = buildSchema(typeDefs)

const query = `
  {
    pokemon(id: 1)
  }
`

graphql(schema, query).then( r => {
  console.log(r)
})