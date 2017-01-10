require("rxjs")

const Rx = require("rxjs")
const { ActionsObservable } = require("redux-observable")

const action$ = ActionsObservable.of({ type: 'START' })

const promise1 = new Promise( (res, rej) => setTimeout( () => res("foo"), 100) )
const promise2 = new Promise( (res, rej) => setTimeout( () => res("baz"), 200) )
const m = Promise.all([promise1, promise2])
  .then( (a, b) => {
    return [a, b]
  })

const playgroudEpic = action$ =>
  action$.ofType("START")
    .mergeMap(a => {
      console.log(m)
      return m
    })
    .map( a => {
      return {
        type: "FINISH",
        payload: a
      }
    })

playgroudEpic(action$).subscribe(x => console.log("RECEIVE", x))
