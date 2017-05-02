const main = () => {
  require.ensure([], (require) => {
    const lib = require("./lib")
    lib()
  })
}