require("rxjs")

const { ActionsObservable, combineEpics, createEpicMiddleware } = require("redux-observable")
const { Observable } = require("rxjs")
const { startConnection, finishConnection, patchAction, fullfiledAction } = require("../actions")
const { patchApi } = require("../api")
const { createMockStore } = require("../store")

const connectionEpic = (action$) => 
  action$.filter( (action) => {
    return action.meta && !!(action.meta.uuid)
  }).map( (action) => {
    return startConnection(action.meta.uuid)
  })

// const createFinish = (action$) =>
//   action$.ofType("PATCH").map( (action) => finishConnection(action.meta.uuid ) )

const patchEpicBase = (meta) => {
  return Observable.fromPromise( patchApi() )
    .map( ({ data }) => fullfiledAction(data.member) )
    // .do( a => console.log("XXX", a) )
    // .withLatestFrom(finishConnection(meta))
}
// const patchEpicBase = (action$, store) =>
//   action$.ofType("PATCH")
//     .mergeMap((action) => patchApi() )
//     .map( ({ data }) => fullfiledAction(data.member) )
    // .withLatestFrom(createFinish(action$))
    // .concatMap( ( a ) => a )

const patchEpic = (action$, store) =>
  action$
    .ofType("PATCH")
    .mergeMap( action => {
      return patchEpicBase(action.id)
    })

describe("", () => {
  it.only("1" ,(done) => {
    const epics = combineEpics(
      connectionEpic,
      patchEpic
    )
    const store = createMockStore(epics)
    store.dispatch(patchAction())
    store.dispatch(patchAction())

    let count = 0
    const unsubscribe = store.subscribe( a => {
      // console.log(store.getActions())
      count++
      if(count > 3){
        unsubscribe()
        done()
      }
    })
  })
})