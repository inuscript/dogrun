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

const patchEpic = (action$, store) => {
  return action$
    .ofType("PATCH")
    .switchMap((action) => patchApi() )
    .map( ({ data }) => fullfiledAction(data.member) )
}

const booEpic = (action$, store) => {
  return action$
    .ofType("FULFILLED")
    .do( a => console.log("BOOO", a))
    .ignoreElements()
}


describe("", () => {
  const epics = combineEpics(
    connectionEpic,
    patchEpic,
    booEpic
  )
  const start = new Date().getTime()

  const logger = store => next => action => {
    const t = new Date().getTime() - start
    console.log(t, action)
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
  })
})