import "rxjs"
import Rx from "rxjs"
import { combineEpics, createEpicMiddleware } from 'redux-observable'
import { createAction } from 'redux-actions';

const increment = createAction("INCREMENT")
const doFizzBuzz = createAction("FIZZBUZZ")
const doReset = createAction("RESET")

const incr = (action$, store) =>
  action$.ofType("ADD")
    .map( () => increment(store.getState().counter))

const fizzBuzz = (action$, store) => {
  let [ other1, fizzbuzz ] = action$
    .ofType("INCREMENT")
    .partition( ({payload}) => payload % 15)

  let [ other2, buzz ] = other1
    .partition( ({payload}) => payload % 5)

  let [ other3, fizz ] = other2
    .partition( ({payload}) => payload % 3)

  return Rx.Observable.merge(
    fizzbuzz.map( () => doFizzBuzz("fizzbuzz") ),
    buzz.map( () => doFizzBuzz("buzz") ),
    fizz.map( () => doFizzBuzz("fizz") ),
    other3.map( () => doReset() )
  )
}

const rootEpics = combineEpics(incr, fizzBuzz)
export default createEpicMiddleware(rootEpics)