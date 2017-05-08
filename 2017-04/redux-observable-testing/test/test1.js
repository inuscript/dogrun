// epic.js
require("rxjs")
const pingEpic = (action$) => {
  return action$.ofType("PING")
    .map( () => {
      return { type: "PONG" }
    })
}

// test.js
const assert = require("assert")
const { ActionsObservable, combineEpics } = require("redux-observable")

describe("epic test", () => {
  it("ping epic", (done) => {
    const mockAction = ActionsObservable.of({type: "PING"})
    pingEpic(mockAction)
      .toArray()
      .subscribe( result => {
        assert.deepEqual(result, [
          {type: "PONG"}
        ])
        done()
      })
  })
})