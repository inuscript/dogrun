import axios from 'axios'

export const search = (word) => {
  const baseURL = "https://ja.wikipedia.org/w/api.php"
  const params = {
    action: "opensearch",
    format: "json",
    callback: "JSONP_CALLBACK",
    search: word
  }
  return axios.get(baseURL, params)
}