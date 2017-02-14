// epic.js
require("rxjs")
const pingEpic = (action$) => {
  return action$.ofType("PING")
    .map( () => {
      return { type: "PONG" }
    })
}

const anotherPingEpic = (action$, store) => {
  return action$.ofType("PING")
    .map( () => {
      return { type: "PUNG", payload: "foo"}
    })
}

// test.js
const assert = require("assert")
const { ActionsObservable, combineEpics } = require("redux-observable")

describe("epic test", () => {
  it("ping epic ( with combine )", (done) => {
    const mockAction = ActionsObservable.of({type: "PING"})
    const combinedEpic = combineEpics(
      pingEpic,
      anotherPingEpic
    )
    combinedEpic(mockAction)
      .toArray()
      .subscribe( result => {
        assert.deepEqual(result, [
          {type: "PONG"},
          {type: "PUNG", "payload": "foo"},
        ])
        done()
      })
  })
})