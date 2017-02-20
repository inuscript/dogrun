require("rxjs")
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

      // console.log(ation)
      // return [
      //   action$.ofType("PATCH").map( () => {
      //     return {} //startConnection("a")
      //   })
      //   // action$.ofType("FULFILLED").map( () => {
      //   //   return finishConnection("a")
      //   // })
      // ]

// const connectEpic = (action$, store) => {
//   return Observable.merge(
//     action$.ofType("PATCH").map( () => ({type: "FOO"}) ),
//     action$.ofType("FULFILLED").map( () => ({type: "FOOBAZ"}) )
//   )
// }
// base:
const patchEpic = (action$, store)  => {
  return action$.ofType("PATCH")
    .switchMap((action) => patchApi() )
    .withLatestFrom(action$.map( (action) => action.meta.uuid ))
    .mergeMap( ([{ data }, meta ]) => {
      return [
        fullfiledAction(data.member),
        finishConnection(meta)
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
      // connectEpic,
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