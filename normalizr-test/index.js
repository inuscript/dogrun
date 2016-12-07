const { normalize, Schema, arrayOf } = require('normalizr')

const article = new Schema('articles');
const author = new Schema('authors');
article.define({
  author: author,
});

const inputA = [{
  id: 1,
  title: 'Some Article',
  author: {
    id: 1,
    name: 'Dan'
  }
}]

const inputB = [{
  id: 2,
  title: 'Some Article',
}]

const inputC = [{
  id: 3,
  title: 'Some Article',
  author: {}
}]


// console.log(normalize(inputA, arrayOf(article)))
// console.log(normalize(inputB, arrayOf(article)))
console.log(normalize(inputC, arrayOf(article)))
// console.log(normalize([], arrayOf(article)))

normalize(inputB, arrayOf(article), {
  mergeIntoEntity: (a, b, c) => {
    console.log(a, b, c)
  }
})