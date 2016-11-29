const axios = require('axios')

const api = axios.create({
  adapter: function(config){
    console.log("adapter")
    return new Promise((resolve, reject) => {
      console.log("adapter(promise)")
      resolve({data: config.data})
    })
  },
  transformRequest: [(data, header) => {
    console.log("transformRequest:")
    return data
  }],
  transformResponse: [(data) => {
    console.log("transformResponse")
    return data
  }]
})

api.interceptors.request.use((config) => {
  console.log("interceptors.request")
  return config
})
api.interceptors.response.use((response) => {
  console.log("interceptors.request")
  return response
})
api.post('/foo', { mock: "data"})