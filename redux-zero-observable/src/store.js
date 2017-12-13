import createStore from "redux-zero";
import { observableMiddleware } from "./observableMiddleware"
// import { ofType } from "redux-observable"
import { ofType } from "./ofType"
import { tap, ignoreElements } from "rxjs/operators"
import { applyMiddleware } from "redux-zero/middleware"

const initialState = { count: 1 };

const epic = (action$) => {
  return action$.pipe(
    ofType("increment"),
    tap( e => {
      console.log(e.name)
    } ),
    ignoreElements()
  )
}
const middleware = observableMiddleware(epic)
const store = createStore(initialState, applyMiddleware(
  middleware
))

export default store;