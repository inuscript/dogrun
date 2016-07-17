import test from 'ava'
import configureMockStore from 'redux-mock-store';
import { createEpicMiddleware, combineEpics } from 'redux-observable';

import Rx from 'rxjs/Rx';

test('scan', t => {
  const pingEpic = action$ => {
    return action$
      .ofType('PING')
      .scan((a, b) => {
        let x = a.payload > b.payload ? a : b
        console.log("MM", a,b, x)
        // console.log(x)
        return {
          type: 'PONG_SCAN',
          payload: x.payload
        }
      }, {payload: 0})

  }
  const epicMiddleware = createEpicMiddleware(pingEpic);
  const mockStore = configureMockStore([epicMiddleware]);

  // let action$ = new Subject()
  let store = mockStore()

  store.dispatch({ type: 'PING', payload: 1 })
  store.dispatch({ type: 'PING', payload: 3 })
  store.dispatch({ type: 'PING', payload: 2 })

  console.log("===")
  console.log(store.getActions())
  // store.dispatch({ type: 'PING', payload: 4 })

})