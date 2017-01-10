require("rxjs")

const Rx = require("rxjs")
const { ActionsObservable } = require("redux-observable")

const action$ = ActionsObservable.of({ type: 'START' })

const promise1 = new Promise( (res, rej) => setTimeout( () => res("foo"), 100) )
const promise2 = new Promise( (res, rej) => setTimeout( () => res("baz"), 200) )

// console.log(Rx.Observable.zip)
// console.log(Rx.Observable.of(4).zip)
// console.log(Rx.Observable.zipAll)
// console.log(Rx.Observable.of(4).zipAll())

const playgroudEpic = action$ =>
  action$.ofType("START")
    .combineLatest(promise1, promise2)
    .map( ([action, ...result]) => {
      return {
        type: "FINISH",
        payload: result
      }
    })

playgroudEpic(action$).subscribe(x => console.log("RECEIVE", x))
