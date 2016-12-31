const libC = require('./libC')

module.exports = () => {
  console.log("this is B")
  libC()
}