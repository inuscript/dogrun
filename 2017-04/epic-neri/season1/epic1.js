require("rxjs")
const { ActionsObservable, combineEpics, createEpicMiddleware } = require("redux-observable")
const { Observable } = require("rxjs")
const { startConnection, finishConnection, patchAction, fullfiledAction } = require("../actions")
const { patchApi } = require("../api")


const connectEpic = (action$) => {
  return action$.ofType("PATCH")
    .map( ({ meta }) => {
      return startConnection(meta)
    })
}

const sampleEpic = (action$, store)  => {
  return action$.ofType("PATCH")
    .combineLatest( 
      patchApi(),
      ( {meta} , {data}) => ({ meta, data })
    )
    .mergeMap( ( {meta, data} ) => {
      return [
        fullfiledAction(data),
        finishConnection(meta.uuid)
      ]
    })
}


describe("", () => {
  it("sandbox", (done) => {
    const action$ = ActionsObservable.of(
      patchAction(),
      patchAction()
    )
    
    const epic = combineEpics( 
      sampleEpic,
      connectEpic
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