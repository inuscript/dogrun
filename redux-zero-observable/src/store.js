import createStore from "redux-zero";
<<<<<<< HEAD
import { applyMiddleware } from "redux-zero/middleware"
import { Subject } from 'rxjs/Subject'
import { map } from 'rxjs/operators'

const stream = (store) => (next) => {
//   const input$ = new Subject()
//   const epic$ = new Subject()
//   epic$.pipe(
//     map( () => {})
//   )
  return (action) => {
    console.log(action.name)
    return next(action);
  }
}

const initialState = { count: 1 }
const middleware = applyMiddleware(stream)

const store = createStore(initialState, middleware)
=======
import { observableMiddleware } from "./observableMiddleware"
// import { ofType } from "redux-observable"
import { ofType } from "./ofType"
import { tap, ignoreElements, map } from "rxjs/operators"
import { applyMiddleware } from "redux-zero/middleware"

const initialState = { count: 1 };

const epic = (action$) => {
  return action$.pipe(
    // ofType("increment"),
    // tap( e => {
    //   console.log(e.name)
    // } ),
    map( (a, b, c) => {
      console.log(a,b ,c)
      return {
        count: b.count + 1
      }
    }),
    // ignoreElements()
  )
}
const middleware = observableMiddleware(epic)
const store = createStore(initialState, applyMiddleware(
  middleware
))
>>>>>>> e3af0d08b1924d2bf2534515d4e5850df205180f

export default store;