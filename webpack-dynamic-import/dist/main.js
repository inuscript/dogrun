webpackJsonp([1],[
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var cbs = [], 
	data;
module.exports = function(cb) {
	if(cbs) cbs.push(cb);
	else cb(data);
}
__webpack_require__.e/* require.ensure */(0).then((function(require) {
	data = __webpack_require__(2);
	var callbacks = cbs;
	cbs = null;
	for(var i = 0, l = callbacks.length; i < l; i++) {
		callbacks[i](data);
	}
}).bind(null, __webpack_require__)).catch(__webpack_require__.oe);

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const main = () => {
  const lib = __webpack_require__(0)
  lib()
}


/***/ })
],[1]);