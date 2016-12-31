const axios = require('axios')
const { normalize, Schema, arrayOf } = require('normalizr')

const article = new Schema('articles')
const user = new Schema('users')

article.define({
  author: user,
  contributors: arrayOf(user)
})

const mockData = [{
  id: 1,
  title: 'Some Article',
  author: {
    id: 1,
    name: 'Dan'
  }
}, {
  id: 2,
  title: 'Other Article',
  author: {
    id: 1,
    name: 'Dan'
  }
}]

const mockAdapter = (config) => {
  return new Promise((resolve, reject) => {
    resolve({data: mockData, status: 200 })
  })
}

const userApi = axios.create({
  adapter: mockAdapter
})

userApi.interceptors.response.use( (res) => {
  res.normalized = normalize(res.data, article)
  return res
})

userApi.get('/foo')
  .then( r => console.log(r.normalized))
