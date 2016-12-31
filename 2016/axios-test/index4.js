const axios = require('axios')

const api = axios.create()

new Promise.all([
  api.get('/my/api'),
  api.get('/my/api2')
]).then( ([api1Result, api2Result]) => {
  //
})

axios.all([
  api.get('/my/api'),
  api.get('/my/api2')
]).then( axios.spread( (api1Result, api2Result) => {
  //
})