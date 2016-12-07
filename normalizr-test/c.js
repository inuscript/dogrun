const { normalize, Schema, arrayOf } = require('normalizr')
const article = new Schema('articles');
const author = new Schema('authors');
article.define({
  author: author,
});

const input = [{
  id: 3,
  title: 'Some Article',
  author: {}
}]
const { entities } = normalize(input, arrayOf(article))

console.log(JSON.stringify(entities, null, 2))

// {
//   "articles": {
//     "3": {
//       "id": 3,
//       "title": "Some Article"
//     }
//   },
//   "authors": {
//     "undefined": {}
//   }
// }