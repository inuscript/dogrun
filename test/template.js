import test from 'ava'
import configureMockStore from 'redux-mock-store';
import { createEpicMiddleware, combineEpics } from 'redux-observable';
import Rx from 'rxjs/Rx';

test('Epic Playground', t => {
  const pingEpic = action$ => action$
    .ofType('PING')
    .map( action => {
      return {
        type: 'PONG',
        payload: action.payload
      }
    })

  const epicMiddleware = createEpicMiddleware(pingEpic);
  const mockStore = configureMockStore([epicMiddleware]);

  let store = mockStore()
  store.dispatch({ type: 'PING', payload: 1 })

  console.log(store.getActions())
  // output:
  // [ { type: 'PING', payload: 1 }, { type: 'PONG', payload: 1 } ]
})