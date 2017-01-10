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

const fizzBuzz = (action$) => {
  const f = action$.filter(({payload}) => payload % 3 === 0).map( () => "fizz")
  const b = action$.filter(({payload}) => payload % 5 === 0).map( () => "buzz")

  return Rx.Observable.zip(f, b, (f,b) => {
    return doFizzBuzz(f + b)
  })
}

const rootEpics = combineEpics(incr, fizzBuzz)
export default createEpicMiddleware(rootEpics)