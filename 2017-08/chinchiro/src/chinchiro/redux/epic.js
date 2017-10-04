import { combineEpics } from "redux-observable"
import { Observable } from "rxjs"
import { rollDice, betMoney, stopRoll } from "./action"

// util
const randomDice = () => Math.floor(Math.random() * 6) + 1

// epics
const startRoll$ = (action$) => 
  action$.ofType("START_ROLL")
    .mergeMap( () => Observable.merge(
      Observable.of(betMoney(10)),
      Observable.of(stopRoll())
        .delay(100)
    ))

const stopRoll$ = (action$) => 
  action$.ofType("STOP_ROLL")
    .mergeMap( () => Observable.from([
      rollDice(0, randomDice()),
      rollDice(1, randomDice()),
      rollDice(2, randomDice()),
    ]) )

export const epics = combineEpics(
  startRoll$,
  stopRoll$
)

