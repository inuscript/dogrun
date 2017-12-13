import createStore from "redux-zero";
import { observableMiddleware } from "./observableMiddleware"
// import { ofType } from "redux-observable"
import { ofType } from "./ofType"
import { tap, ignoreElements, map } from "rxjs/operators"
import { applyMiddleware } from "redux-zero/middleware"

const initialState = { count: 1 };
const store = createStore(initialState)

export default store;