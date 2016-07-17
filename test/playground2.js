import test from 'ava'
import configureMockStore from 'redux-mock-store';
import { createEpicMiddleware, combineEpics } from 'redux-observable';

import 'rxjs/add/operator/mapTo'
import 'rxjs/add/operator/map'

test("XXX", t => {
  const pingEpic = action$ => {
    return action$
      .ofType('PING')
      .map(e => {
        return { type: 'PONG' }
      })
  }
  const epicMiddleware = createEpicMiddleware(pingEpic);
  const mockStore = configureMockStore([epicMiddleware]);

  // let action$ = new Subject()
  let store = mockStore()

  store.dispatch({ type: 'PING' })
  console.log(store.getActions())
})