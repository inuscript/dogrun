require("rxjs")
const { ActionsObservable, combineEpics, createEpicMiddleware } = require("redux-observable")
const { Observable } = require("rxjs")
const { startConnection, finishConnection, patchAction, fullfiledAction } = require("../actions")

const patchApi = () => {
  return new Promise( (res) => {
    setTimeout( () => {
      res({data: { member: "foo"} })
    }, 100)
  })
}

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
    const mockAction = {
      type: "PATCH",
      meta: {
        uuid: "beef-beef-beef-beef"
      }
    }
    const action$ = ActionsObservable.of(mockAction)
    
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
        // console.log((new Date().getTime() - start) ,r)
      }, (e) => {} , (result) => {
        done()
      })
  })
})