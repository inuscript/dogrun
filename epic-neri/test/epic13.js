require("rxjs")

const { ActionsObservable, combineEpics, createEpicMiddleware } = require("redux-observable")
const { Observable } = require("rxjs")
const { startConnection, finishConnection, patchAction, fullfiledAction } = require("../actions")
const { patchApi } = require("../api")
const configureStore = require('redux-mock-store').default

const connectionEpic = (action$) => 
  action$.filter( (action) => {
    return action.meta && !!(action.meta.uuid)
  }).map( (action) => {
    return startConnection(action.meta.uuid)
  })

const createFinish = (action$) =>
  action$.ofType("PATCH").map( (action) => finishConnection(action.meta.uuid ) )

const patchEpic = (action$, store) =>
  action$.ofType("PATCH")
    .mergeMap((action) => patchApi() )
    .map( ({ data }) => fullfiledAction(data.member) )
    .withLatestFrom(createFinish(action$))
    .concatMap( ( a ) => a )

describe("", () => {
  const epics = combineEpics(
    connectionEpic,
    patchEpic 
    // booEpic
  )
  const start = new Date().getTime()

  const logger = store => next => action => {
    const t = new Date().getTime() - start
    console.log(t, action)
    console.log("===================")
    return next(action)
  }

  const mockStore = configureStore([
    createEpicMiddleware(epics),
    logger
  ])

  it.only("13" ,(done) => {
    const initActionMock = { type: "@INIT" }
    const store = mockStore({})
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