require("rxjs")

const Rx = require("rxjs")
const { ActionsObservable } = require("redux-observable")

const action$ = ActionsObservable.of({ type: 'START' })

const playgroudEpic = action$ =>
  action$.ofType("START")
    .mapTo({
      type: "FINISH"
    })

playgroudEpic(action$).subscribe(x => console.log("RECEIVE", x))
