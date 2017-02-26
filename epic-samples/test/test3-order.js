require("rxjs")
const { ActionsObservable, combineEpics } = require("redux-observable")

const catEpic = (action$, store) => action$.ofType("HELLO").mapTo({type: "CAT"})

const dogEpic = (action$, store) =>　action$.ofType("HELLO").mapTo({type: "DOG"})

const fishEpic = (action$, store) => action$.ofType("HELLO").mapTo({type: "FISH"})

describe.only("", () => {
  const action$ = ActionsObservable.of({type: "HELLO"})

  it("order", (done) => {
    const epic = combineEpics(dogEpic, catEpic)
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

  it("order", (done) => {
    const epic = combineEpics(catEpic, dogEpic)
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
  it("order", (done) => {
    const epic = combineEpics(
      combineEpics(catEpic, dogEpic),
      fishEpic
    )
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
  it("order", (done) => {
    const epic = combineEpics(
      fishEpic,
      combineEpics(catEpic, dogEpic)
    )
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
})