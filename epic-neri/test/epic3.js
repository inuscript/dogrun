require("rxjs")
const uuid = require("uuid")
const { ActionsObservable, combineEpics, createEpicMiddleware } = require("redux-observable")
const { Observable } = require("rxjs")

const startConnection = (id) => {
  return {
    type: "START_CONNECTION",
    id: id
  }  
}

const finishConnection = (id) => {
  return {
    type: "FINISH_CONNECTION",
    id: id
  }  
}

const patchAction = (id) => {
  return {
    type: "PATCH",
    meta: {
      uuid: uuid.v4()
    }
  }
}

const fullfiledAction = (data) => {
  return {
    type: "FULFILLED",
    data: data
  }
}

const patchApi = () => {
  return new Promise( (res) => {
    setTimeout( () => {
      res({data: { member: "foo"} })
    }, 100)
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

const patchEpic = (action$, store) =>
  action$.ofType("PATCH")
    .switchMap((action) => patchApi() )
    .map( ({ data }) => {
      return fullfiledAction(data.member)
    })
    .withLatestFrom(createFinish(action$))
    .concatMap( ( a ) => a )


describe("", () => {
  it.only("4", (done) => {
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