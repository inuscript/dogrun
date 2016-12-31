import test from 'ava'
import configureMockStore from 'redux-mock-store';
import { createEpicMiddleware, combineEpics } from 'redux-observable';

import 'rxjs/add/operator/mapTo'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/filter'
// import 'rxjs/add/operator/empty'


test('Filter action (meta)', t => {
  const pingEpic = action$ => {
    return action$
      .ofType('PING')
      .filter( action => {
        return !(action.meta && action.meta.filterd)
      })
      // .mapTo({type: 'PONG'})
      .map( a => Object.assign({}, a, {
        // type: 'PONG', 
        payload: a.payload * 2, 
        meta: {
          filterd: true
        }
      } ))
  }
  const epicMiddleware = createEpicMiddleware(pingEpic);
  const mockStore = configureMockStore([epicMiddleware]);

  // let action$ = new Subject()
  let store = mockStore()

  store.dispatch({ type: 'PING', payload: 10 })
  console.log(store.getActions())
})