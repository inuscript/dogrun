const {
  createSelector, promiseSelector
} = require("./")

describe("", () => {
  it("mock1", () => {
    const a = createSelector(
      (state) => state.shop.items
    ).combine(
      items => items.reduce((acc, item) => acc + item.value, 0)
    )
    const sum = a({
      shop: {
        items: [{
          value: 10
        }, {
          value: 20
        }]
      }
    })
    console.log(sum)
  })
  // it("mock1", () => {
  //   const subtotalSelector = createSelector(
  //     (state) => state.shop.items
  //   ).combine(
  //     items => items.reduce((acc, item) => acc + item.value, 0)
  //   )
  //   const taxSelector = createSelector(
  //     subtotalSelector,
  //     (state) => state.shop.taxPercent
  //   ).combine(
  //     (subtotal, taxPercent) => subtotal * (taxPercent / 100)
  //   )
  //   const totalSelector = createSelector(
  //     subtotalSelector,
  //     taxSelector
  //   ).combine(
  //     (subtotal, tax) => ({ total: subtotal + tax })
  //   )
  //   const sum = totalSelector({
  //     shop: {
  //       items: [{
  //         value: 10
  //       }, {
  //         value: 20
  //       }],
  //       taxPercent: 0.1
  //     }
  //   })
  //   console.log(sum)
  // })
  it("mock1", () => {

    const subtotalSelector = promiseSelector({
      subtotal: (state) => state.shop.items,
      taxPercent: (state) => state.shop.taxPercent
    }).then( ( {subtotal, taxPercent}, state ) => {
      return {
        subtotal, taxPercent,
        tax: subtota * (taxPercent / 100)
      }
    }).then(
      ({ subtotal, tax}, state) => {
        return { total: subtotal + tax }
      }
    )
    const sum = totalSelector({
      shop: {
        items: [{
          value: 10
        }, {
          value: 20
        }],
        taxPercent: 0.1
      }
    })
    console.log(sum)
  })
})