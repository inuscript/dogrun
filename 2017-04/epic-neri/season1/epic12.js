require("rxjs")

const { ActionsObservable, combineEpics, createEpicMiddleware } = require("redux-observable")
const { Observable } = require("rxjs")
const { startConnection, finishConnection, patchAction, fullfiledAction } = require("../actions")
const { patchApi } = require("../api")


const connectionEpic = (action$) =>
  action$.filter( (action) => {
    return action.meta && !!(action.meta.uuid)
  }).map( (action) => {
    return startConnection(action.meta.uuid)
  })

const patchEpic = (action$, store) => {
  return action$
    .ofType("PATCH")
    .switchMap((action) => patchApi() )
    .map( ({ data }) => fullfiledAction(data.member) )
}

const booEpic = (action$, store) => {
  return action$
    .ofType("FULFILLED")
    .do( a => console.log("BOOO", a))
    .ignoreElements()
}


describe("", () => {
  const epic = combineEpics(
    connectionEpic,
    patchEpic,
    booEpic
  )

  it("12" ,(done) => {
    const initActionMock = { type: "@INIT"}
    const action$ = ActionsObservable.of(
      // patchAction(),
      patchAction()
    )
    const start = new Date().getTime()
    const source = epic(action$, {})
    source
      .subscribe( (r) => {
        console.log((new Date().getTime() - start) ,r)
      }, (e) => {
        throw e
      }, (result) => {
        done()
      })
  })
  it("12 - 2" ,(done) => {
    const source = epic(ActionsObservable.of(
      fullfiledAction("foo")
    ), {})
    source
      .subscribe( (r) => {
        console.log((new Date().getTime() - start) ,r)
      }, (e) => {
        throw e
      }, (result) => {
        // done()
      })
  })
})