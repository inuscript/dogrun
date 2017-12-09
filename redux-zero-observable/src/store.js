import createStore from "redux-zero";
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

export default store;