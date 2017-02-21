require("rxjs")

const { ActionsObservable, combineEpics, createEpicMiddleware } = require("redux-observable")
const { Observable } = require("rxjs")
const { startConnection, finishConnection, patchAction, fullfiledAction } = require("../actions")
const { patchApi } = require("../api")

// const connectionEpic = (action$) => 
//   action$.filter( (action) => {
//     return action.meta && !!(action.meta.uuid)
//   }).map( (action) => {
//     return startConnection(action.meta.uuid)
//   })

// const createFinish = (action$) =>
//   action$.map( (action) => finishConnection(action.meta.uuid ) )

const connectionEpic = (action$) =>
  action$.filter( (action) => {
    return action.meta && !!(action.meta.uuid)
  }).map( (action) => {
    return startConnection(action.meta.uuid)
  })

const patchEpicBase = (action$, store, baseAction) => {
  return action$.ofType("PATCH")
    .mergeMap((action) => patchApi() )
    .map( ({ data }) => fullfiledAction(data.member) )
}

const patchEpic = (action$, store) => {
  return action$
    .map( nest$ => {
      return new ActionsObservable(nest$).combineLatest(
        patchEpicBase(action$, store),
        nest$.map( (action) => action ),
        (fullfiledAction, meta) => {
          return [
            fullfiledAction,
            finishConnection(meta)
          ]
        })
    }).mergeAll()
}

describe("", () => {
  it.only("10", (done) => {
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