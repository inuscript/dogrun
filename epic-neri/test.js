require("rxjs")
const { ActionsObservable, combineEpics, createEpicMiddleware } = require("redux-observable")
const { Observable } = require("rxjs")

const startConnection = (id) => {
  return {
    type: "START",
    id: id
  }  
}

const finishConnection = (id) => {
  return {
    type: "FINISH",
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
    }, 10)
  })
}

// base:
const sampleEpic1 = (action$, store)  => {
  return action$.ofType("PATCH")
    .switchMap((action) => patchApi() )
    .map( ({ data }) => {
      return fullfiledAction(data.member)
    })
}

// const sampleEpic = (action$, store)  => {
//   return action$.ofType("PATCH")
//     .combineLatest( 
//       patchApi(),
//       ( {meta} , {data}) => {
//         return { meta, data }
//       })
//     .map( ( {meta, data} ) => {
//       return fullfiledAction(data)
//       // return Observable.from(
//       //   fullfiledAction(data),
//       //   finishConnection(meta.uuid)
//       // )
//     })
// }

describe("", () => {
  it.only("sandbox", (done) => {
    const mockAction = {
      type: "PATCH",
      meta: {
        uuid: "beef-beef-beef-beef"
      }
    }
    const action$ = ActionsObservable.of(mockAction)
    const epic = sampleEpic1(action$, {})
    epic.subscribe( result => {
      console.log(result)
      done()
    })
  })
})