import test from 'ava'
import configureMockStore from 'redux-mock-store';
import { createEpicMiddleware, combineEpics } from 'redux-observable';
import Rx from 'rxjs/Rx';


test('XXX', t => {
  const addComp = action$ => Observable.takeUntil(action$.ofType('ADD_COMPLETE'))

  const pingEpic = action$ => action$
    .ofType('ADD')
    // .window(addComp(action$))
    // .windowCount(3)
    .takeUntil(action$.ofType('ADD_COMPLETE'))
    // .windowWhen(action$.ofType('ADD_COMPLETE'))
    .pluck('payload')
      .startWith(0)
      .reduce((acc, curr) => {
        console.log(acc, curr, "reduce")
        return acc + curr
      })
    .map( sum => ({
      type: 'PONG!!!',
      payload: sum
    }))

  const epicMiddleware = createEpicMiddleware(pingEpic);
  const mockStore = configureMockStore([epicMiddleware]);

  let store = mockStore()
  store.dispatch({ type: 'ADD', payload: 1 })
  store.dispatch({ type: 'ADD', payload: 2 })
  store.dispatch({ type: 'ADD_COMPLETE' })
  store.dispatch({ type: 'ADD', payload: 4 })
  store.dispatch({ type: 'ADD_COMPLETE' })

  console.log(store.getActions())
  // output:
  // [ { type: 'PING', payload: 1 }, { type: 'PONG', payload: 1 } ]
})