require("rxjs")
const { ActionsObservable, combineEpics } = require("redux-observable")

const notValidEpic = (action$, store) => 
  action$.ofType("HELLO")
    .mapTo({type: invalidValue})
  

describe.only("", () => {
  const action$ = ActionsObservable.of({type: "HELLO"})

  it("error", (done) => {
    const epic = combineEpics(notValidEpic)
    epic(action$)
      .subscribe({
        next: (action) => {
          console.log(action)
        }, 
        complete: (result) => {
          done()
        }
      })
  })

  it("error", (done) => {
    const epic = combineEpics(notValidEpic)
    epic(action$)
      .subscribe({
        next: (action) => {
          console.log(action)
        }, 
        error: (e) => { throw e },
        complete: (result) => {
          done()
        }
      })
  })
  it("toPromise", () => {
    const epic = combineEpics(notValidEpic)
    return epic(action$)
      .toPromise()
      .then( result => {
        // assert(result)
      })
  })

})