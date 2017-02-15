// epic.js
require("rxjs")
const pingEpic = (action$) => {
  return action$.ofType("PING")
    .map( () => {
      return { type: "PONG" }
    })
}

// test.js
const configureStore = require('redux-mock-store').default
const assert = require("assert")
const { createEpicMiddleware } = require("redux-observable")

describe("epic test", () => {
  it("ping epic with mockStore", () => {
    const mockStore = configureStore([
      createEpicMiddleware(pingEpic)
    ])
    const store = mockStore()
    store.dispatch({type: "PING"})
    assert.deepEqual(store.getActions(), [
      {type: "PING"},
      {type: "PONG"}
    ])
  })
})