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

const patchEpic = (action$, store) => {
  const finishAction = createFinish(action$)
  return action$.ofType("PATCH")
    .map((action) => {
      return Observable.merge(
        Observable.fromPromise(patchApi),
        Observable.of(action)
      )
    })
    .mergeMap( (a) => {
    // .mergeMap( a => {
      console.log(a)
      return [
        fullfiledAction(data.member),
        finishConnection(action.meta.uuid )
      ]
    })
}

describe("", () => {
  it.only("6", (done) => {
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
      }, (e) => {
        throw e
      } , (result) => {
        done()
      })
  })
})