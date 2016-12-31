const axios = require('axios')

const mockData = [{
  id: 1,
  title: 'Some Article',
}]

const mockAdapter = (config) => {
  return new Promise((resolve, reject) => {
    resolve({data: mockData, status: 200 })
  })
}

axios.get('/some/url', {
  adapter: mockAdapter
}).then( response => {
  console.log(response.data) // mockData
  console.log(response.status) // 200
})