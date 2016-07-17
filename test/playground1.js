import test from 'ava'
import configureMockStore from 'redux-mock-store';
import { createEpicMiddleware, combineEpics } from 'redux-observable';

import 'rxjs/add/operator/mapTo'
import 'rxjs/add/operator/map'

test( t => {
  const pingEpic = action$ => {
    console.log("ping epic")
    return action$
      .ofType('PING')
      .map(e => {
        return { type: 'PONG' }
      })
  }
  const pongEpic = action$ => {
    console.log("pong epic")
    return action$
      .ofType('PONG')
      .map(e => {
        return { type: 'PONGD' }
      })
  }

  const rootEpic = combineEpics(pingEpic, pongEpic)
  const epicMiddleware = createEpicMiddleware(rootEpic);
  const mockStore = configureMockStore([epicMiddleware]);

  // let action$ = new Subject()
  let store = mockStore()

  console.log("Dispatch")
  store.dispatch({ type: 'PING' })
  console.log(store.getActions())
})