// lazyPing
const lazyPing = () => {
  return new Promise( res => {
    setTimeout( () => {
      res("DELAY")
    }, 100)
  })
}

// epic.js
require("rxjs")
const pingEpic = (action$) => {
  return action$.ofType("PING")
    .mergeMap( () => lazyPing() )
    .map( (result) => {
      return { type: "PONG", payload: result}
    })
}

// test.js
const assert = require("assert")
const { ActionsObservable, combineEpics } = require("redux-observable")

describe("epic test", () => {
  it("lazy ping epic", (done) => {
    const mockAction = ActionsObservable.of({type: "PING"})
    pingEpic(mockAction)
      .toArray()
      .subscribe( result => {
        assert.deepEqual(result, [
          {type: "PONG", payload: "DELAY"}
        ])
        done()
      })
  })
})