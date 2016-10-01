import test from 'ava'
import configureMockStore from 'redux-mock-store';
import { createEpicMiddleware, combineEpics } from 'redux-observable';

import Rx from 'rxjs/Rx';

test('Max Until', t => {
  const pingEpic = action$ => action$
    .ofType('PING')
    // .startWith({payload: 10})
    .takeUntil(action$.ofType('PING_COMPLETE'))
    .max((a, b) => {
      let x = a.payload > b.payload ? a : b
      // console.log("MM", a,b, x)
      return x
    })
    .map( a => ({
      type: 'PONG!!!',
      payload: a.payload
    }))

  const epicMiddleware = createEpicMiddleware(pingEpic);
  const mockStore = configureMockStore([epicMiddleware]);

  // let action$ = new Subject()
  let store = mockStore()

  store.dispatch({ type: 'PING', payload: 1 })
  store.dispatch({ type: 'PING', payload: 3 })
  store.dispatch({ type: 'PING_COMPLETE' })
  store.dispatch({ type: 'PING', payload: 1 })
  store.dispatch({ type: 'PING', payload: 4 })
  store.dispatch({ type: 'PING_COMPLETE' })
  // store.dispatch({ type: 'PING', payload: 1 })
  // store.dispatch({ type: 'PING_COMPLETE' })
  console.log("===")
  console.log(store.getActions())

})