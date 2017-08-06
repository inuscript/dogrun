const groupBy = require("lodash.groupby")
const mapValues = require("lodash.mapvalues")

const ArrayDenormalize = (schema, input, unvisit) => {
  // schema = validateSchema(schema);
  return (input && input.map) ?
    input.map((entityOrId) => unvisit(entityOrId, schema)) :
    input;
};

module.exports = (input, schema, entities) => {
  console.log(schema)
  ArrayDenormalize(schema, input, () => {
    console.log("aaa")
  })
}