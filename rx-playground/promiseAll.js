require("rxjs")

const Rx = require("rxjs")
const { ActionsObservable } = require("redux-observable")

const action$ = ActionsObservable.of({ type: 'START' })

const promise1 = new Promise( (res, rej) => setTimeout( () => res("foo"), 100) )
const promise2 = new Promise( (res, rej) => setTimeout( () => res("baz"), 200) )

const playgroudEpic = action$ =>
  action$.ofType("START")
    .combineAll(promise1, promise2)
    .map( ([action, ...result]) => {
      return {
        type: "FINISH",
        payload: result
      }
    })

const playgroudEpic2 = action$ =>
  action$.ofType("START")
    .zip(
      promise1,
      promise2,
      (action, ...result) => result
    )
    .map( a => {
      return {
        type: "FINISH",
        payload: a
      }
    })

playgroudEpic(action$).subscribe(x => console.log("RECEIVE", x))
