// epic.js
require("rxjs")

const counterEpic = (action$, store) => {
  return action$.ofType("DO_INCREMENT")
    .map( (action) => {
      return { 
        type: "INCREMENT", 
        payload: action.payload + store.baseCount
      }
    })
}

// test.js
const assert = require("assert")
const { ActionsObservable, combineEpics } = require("redux-observable")

describe("epic test", () => {
  it("counter epic", (done) => {
    const mockAction = ActionsObservable.of({type: "DO_INCREMENT", payload: 2})
    const mockStore = {
      baseCount: 10
    }
    counterEpic(mockAction, mockStore)
      .toArray()
      .subscribe( result => {
        assert.deepEqual(result, [
          {type: "INCREMENT", payload: 12},
        ])
        done()
      })
  })
})