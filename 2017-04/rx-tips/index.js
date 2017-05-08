require("rxjs")

const Rx = require("rxjs")
const { ActionsObservable } = require("redux-observable")

const playgroundEpic = action$ =>
  action$.ofType("FIRST")
    .map( (a) =>( { type: "THIRD" } ) )

const action$ = ActionsObservable.of({ type: 'FIRST' }, { type: 'SECOND' })

playgroundEpic(action$).subscribe(x => console.log("RECEIVE", x))
