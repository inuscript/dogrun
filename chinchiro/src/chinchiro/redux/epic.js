import { combineEpics } from "redux-observable"
import { Observable } from "rxjs"
import { rollDice } from "./action"

// util
const randomDice = () => Math.floor(Math.random() * 6) + 1

// epics
const startRoll = (action$) => 
  action$.ofType("START_ROLL")
    .mergeMap( () => {
      return Observable.from([
        rollDice(0, randomDice()),
        rollDice(1, randomDice()),
        rollDice(2, randomDice()),
      ])
    })

const checkDices = (action$) => 
  Observable.zip(
    action$.ofType("ROLL_DICE")
      .filter( action => action.payload.number === 0)
      .map( action => action.payload.value),
    action$.ofType("ROLL_DICE")
      .filter( action => action.payload.number === 1)
      .map( action => action.payload.value),
    action$.ofType("ROLL_DICE")
      .filter( action => action.payload.number === 2)
      .map( action => action.payload.value),
  ).map( (dices) => {
    console.log(dices.sum())
  })
  .ignoreElements()

export const epics = combineEpics(
  startRoll,
  checkDices
)

