const { createSelector, createStructuredSelector } = require("reselect")

class ChainSelector {
  constructor(...selectors){

    this.selectors = selectors
  }
  combine(fn){
    return createSelector(...this.selectors, fn)
  }
}

class PromiseSelector {
  constructor(structured){
    this.structured = structured
  }
  then(fn){
    const selector = createStructuredSelector(this.structured)
    return (state, props) => {
      const result = selector(state, props)
      return new PromiseSelector(fn(result))
    }
  }
}
module.exports.createSelector = (...selectors) => {
  // const a = createSelector(...selectors)
  return new ChainSelector(...selectors)
  // console.log(a)
}
module.exports.promiseSelector = (...selectors) => {
  // const a = createSelector(...selectors)
  return new PromiseSelector(...selectors)
  // console.log(a)
}
