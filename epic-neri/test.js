require("rxjs")
const { ActionsObservable } = require("redux-observable")


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

const _sampleEpic = (action$, store)  => {
  return action$.ofType("PATCH")
    .switchMap((action) => patchApi() )
    .map( ({ data }) => {
      return fullfiledAction(data.member)
    })
}
const sampleEpic = (action$, store)  => {
  return action$.ofType("PATCH")
    .switchMap( (action, meta) => patchApi() )
    .map( ({ data }, meta) => {
      return [
        fullfiledAction(data.member),
      ]
    })
}

describe("", () => {
  it.only("sandbox", () => {
    const mockAction = {
      type: "PATCH",
      meta: {
        uuid: "beef-beef-beef-beef"
      }
    }
    const action$ = ActionsObservable.of(mockAction)
    return sampleEpic(action$, {})
      .toPromise()
      .then( result => {
        console.log(result)
      })
  })
})