require("rxjs")

const Rx = require("rxjs")
const { ActionsObservable } = require("redux-observable")

const action$ = ActionsObservable.of({ type: 'FIRST' }, { type: 'SECOND' })

const epic = action$ =>
  action$.ofType("FIRST")
    .map( (a) =>( { type: "THIRD" } ) )

epic(action$).subscribe(x => console.log("RECEIVE", x))
