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

const createFinish = (action$) => 
  action$.map( (action) => finishConnection(action.meta.uuid ) )

const patchEpic = (action$, store) =>
  action$.ofType("PATCH")
    .mergeMap((action) => patchApi() )
    .withLatestFrom(
      createFinish(action$)
    )
    // .mergeMap( ( [{ data }, f] ) => {
    .mergeMap( ( [ { data }, f] ) => {
      console.log([
        fullfiledAction(data.member),
        f
      ])
      return [
        fullfiledAction(data.member),
        f
      ]
    })
    // .concatMap( ( a ) => a )


describe("", () => {
  it.only("5", (done) => {
    const initActionMock = { type: "@INIT"}
    const action$ = ActionsObservable.of(
      patchAction(),
      patchAction()
    )

    const epic = combineEpics( 
      connectionEpic,
      patchEpic
    )
    const start = new Date().getTime()
    epic(action$, {})
      .subscribe( (r) => {
        console.log((new Date().getTime() - start) ,r)
      }, (e) => {} , (result) => {
        done()
      })
  })
})