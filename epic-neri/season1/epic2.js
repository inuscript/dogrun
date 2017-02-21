require("rxjs")
const { ActionsObservable, combineEpics, createEpicMiddleware } = require("redux-observable")
const { Observable } = require("rxjs")
const { startConnection, finishConnection, patchAction, fullfiledAction } = require("../actions")
const { patchApi } = require("../api")


      // console.log(ation)
      // return [
      //   action$.ofType("PATCH").map( () => {
      //     return {} //startConnection("a")
      //   })
      //   // action$.ofType("FULFILLED").map( () => {
      //   //   return finishConnection("a")
      //   // })
      // ]

const connectEpic = (action$, store) => {
  return Observable.merge(
    action$.ofType("PATCH").map( () => {
      return {type: "FOO"}
     }),
    action$.ofType("FULFILLED").map( () => ({type: "FOOBAZ"}) )
  )
}
// base:
const patchEpic = (action$, store)  => {
  return action$.ofType("PATCH")
    .mergeMap((action) => patchApi() )
    .withLatestFrom(action$.map( (action) => action.meta.uuid ))
    .mergeMap( ([{ data }, meta ]) => {
      return [
        fullfiledAction(data.member),
        finishConnection(meta)
      ]  
    })
}

describe("", () => {
  it("2 - sandbox", (done) => {
    const action$ = ActionsObservable.of(patchAction(), patchAction())

    const epic = combineEpics( 
      connectEpic,
      patchEpic
    )
    const start = new Date().getTime()
    epic(action$, {})
      // .toArray()
      // .subscribe( result => {
      // .toPromise()
      // .then( result => {
      .subscribe( (r) => {
        console.log((new Date().getTime() - start) ,r)
      }, (e) => {} , (result) => {
        done()
      })
  })
})