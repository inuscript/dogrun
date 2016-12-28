import { createStore, combineReducers } from "redux"
import { reducers } from './ducks'
const rootReducer = combineReducers(reducers, {})

export const configureStore = () => {
  return createStore(rootReducer)
}

