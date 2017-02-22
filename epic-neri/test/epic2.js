require("rxjs")

const { ActionsObservable, combineEpics, createEpicMiddleware } = require("redux-observable")
const { Observable, Subject } = require("rxjs")
const { startConnection, finishConnection, patchAction, fullfiledAction } = require("../actions")
const { patchApi } = require("../api")
const { createMockStore } = require("../store")

// const connectionEpic = (action$) => 
//   action$.ofType("PATCH")
//     .map( (action) => startConnection(action.meta.uuid) )

const patchEpicBase = (action$, store) =>
  action$
    .ofType("PATCH")
    .mergeMap((action) => patchApi() )
    .map( ({ data }) => fullfiledAction(data.member) )
    .do( a => console.log("FINISH patchEpic"))

const patchSource$ = Observable.fromPromise(patchApi())
  .map( ({ data }) => fullfiledAction(data.member) )

const patchEpic = (action$, store) =>
  action$.ofType("PATCH")
    .mergeMap( (action) => {
      return Observable.concat(
        Observable.of(startConnection(action.meta.uuid)),
        patchEpicBase(ActionsObservable.of(action)),
        Observable.of(finishConnection(action.meta.uuid))
      )
    })


describe("", () => {
  it.only("2" ,(done) => {
    const epics = combineEpics(
      // connectionEpic,
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