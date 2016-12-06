webpackJsonp([0,2],[
/* 0 */
/***/ function(module, exports) {

module.exports = () => {
  console.log("this is C")
}

/***/ },
/* 1 */
/***/ function(module, exports) {


module.exports = () => {
  console.log("this is A")
}

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

const libC = __webpack_require__(0)

module.exports = () => {
  console.log("this is B")
  libC()
}

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

const libA = __webpack_require__(1)
const libB = __webpack_require__(2)

libA()
libB()

// const assign = require("object-assign")
// const leftPad = require("left-pad")
// 
// assign({"a": "b"},{ "c": "d"})
// leftPad(" foo")

/***/ }
],[3]);