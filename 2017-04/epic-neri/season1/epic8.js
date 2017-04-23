require("rxjs")
const { ActionsObservable, combineEpics, createEpicMiddleware } = require("redux-observable")
const { Observable } = require("rxjs")
const { startConnection, finishConnection, patchAction, fullfiledAction } = require("../actions")
const { patchApi } = require("../api")

// base:
const _patchEpic = (action$, store)  => {
  return action$.ofType("PATCH")
    // .do( a => console.log(a))
    .mergeMap((action) => patchApi() )
    .map( ({ data }) => {
      return fullfiledAction(data.member)
    })
}

const connectionEpic = (action$) =>
  action$.filter( (action) => {
    return action.meta && !!(action.meta.uuid)
  }).map( (action) => {
    return startConnection(action.meta.uuid)
  })

const createFinish = (action$) =>
  action$.map( (action) => finishConnection(action.meta.uuid ) )

const patchEpic = (action$, store)  => {
  return action$
    .let( obs$ => {
      return Observable.merge(
        _patchEpic(obs$),
        obs$.map( act => {
          return {type: "XXX", uuid: act.meta.uuid}
        })
      )
    })

}

describe("", () => {
  it("8", (done) => {
    const mockAction = {
      type: "PATCH",
      meta: {
        uuid: "beef-beef-beef-beef"
      }
    }
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
      // .toArray()
      // .subscribe( result => {
      // .toPromise()
      // .then( result => {
      .subscribe( (r) => {
        console.log((new Date().getTime() - start) ,r)
      }, (e) => {
        throw e
      } , (result) => {
        done()
      })
  })
})