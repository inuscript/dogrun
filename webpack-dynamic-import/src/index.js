const main = () => {
  const lib = require("bundle-loader?lazy!./lib")
  lib()
}
