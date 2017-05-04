import { combineReducers, createStore, applyMiddleware } from "redux"
import { reducer } from "./reducer"
import { epics } from "./epic"
export const epicMiddleware = createEpicMiddleware(epics)

export const configureStore = () => {
  return createStore(reducer, applyMiddleware(epicMiddleware))
}