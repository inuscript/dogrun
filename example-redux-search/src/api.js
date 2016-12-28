import fetchJsonp from 'fetch-jsonp'
import qs from 'querystring'

export const searchApi = (word) => {
  const baseURL = "https://ja.wikipedia.org/w/api.php"
  const params = {
    action: "opensearch",
    format: "json",
    search: word
  }
  return fetchJsonp(`${baseURL}?${qs.stringify(params)}`)
    .then( response => response.json() )
    .then( json => {
      return json[1]
    })

}

const parseJson = (json) => {
  return json[1].map( (_, i) => {
    return {
      name: json[1][i],
      description: json[2][i],
      url: json[3][i]
    }
  })
}