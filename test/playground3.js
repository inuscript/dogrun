import test from 'ava'
import configureMockStore from 'redux-mock-store';
import { createEpicMiddleware, combineEpics } from 'redux-observable';

import 'rxjs/add/operator/mapTo'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/max'
import 'rxjs/add/operator/combineAll'
import 'rxjs/add/operator/last'
import 'rxjs/add/operator/mergeMap'
// import 'rxjs/add/operator/empty'



test('Max', t => {
  const pingEpic = action$ => {
    return action$
      .ofType('PING')
      .max((a, b) => {
        let x = a.payload > b.payload ? a : b
        console.log("MM", a,b, x)
        return x
      })
      .map( a => {
        console.log("||||")
        console.log(a)
        return {
          type: 'PONG',
          payload: a.payload * 10
        }
      })

      // .map(a => {
      //   console.log(a)
      //   return {
      //     type: 'PONG',
      //     payload: a.payload
      //   }
      // })
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
})