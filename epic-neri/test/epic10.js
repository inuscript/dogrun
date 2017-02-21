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

const patchEpicBase = (action$, store) => {
  return action$.ofType("PATCH")
    .mergeMap((action) => patchApi() )
    .map( ({ data }) => fullfiledAction(data.member) )
}

const patchEpic = (action$, store) => {
  return action$
    .combineLatest(
      patchEpicBase(action$, store),
      action$.map( (action) => {
        // console.log("MMMM", action)
        return action
      }),
      (a, fullfiledAction, action) => {
        console.log("XXXXXXXXXXXXXXXXXXXXXXX")
        console.log("XXX",a, action)
        console.log("XXXXXXXXXXXXXXXXXXXXXXX")
        
        return [
          fullfiledAction,
          finishConnection(action)
        ]
      })
      .concatAll()
//       .do( a => {
//         console.log("XXXX", a)
//       })
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