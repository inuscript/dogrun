const _ = require('lodash')

const { normalize, Schema, arrayOf } = require('normalizr')

const article = new Schema('articles');
const author = new Schema('authors');
article.define({
  author: author
});

const input = [{
  id: 2,
  title: 'Some Article',
}]

const { entities } = normalize(input, arrayOf(article))

console.log(JSON.stringify(entities, null, 2))

// {
//   "articles": {
//     "2": {
//       "id": 2,
//       "title": "Some Article"
//     }
//   }
// }

const schemas = [article, author]
const defaults = schemas.reduce( (curr, schema) => {
  curr[schema.getKey()] = {}
  return curr
}, {})
const filledSchema = Object.assign(defaults, entities)
console.log(JSON.stringify(defaults, null, 2))
