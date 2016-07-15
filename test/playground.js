import test from 'ava'
import configureMockStore from 'redux-mock-store';
import { createEpicMiddleware } from 'redux-observable';


test( t => {
  const pingEpic = action$ => {
    // console.log(action$.filter)
    return action$.filter(action => action.type === 'PING')
      .mapTo({ type: 'PONG' })
  }

  console.log("Store Setup")
  const epicMiddleware = createEpicMiddleware(pingEpic);
  const mockStore = configureMockStore([epicMiddleware]);

  // let action$ = new Subject()
  let store = mockStore()

  console.log("Dispatch")
  store.dispatch({ type: 'PING' })
  console.log(store.getActions())
})