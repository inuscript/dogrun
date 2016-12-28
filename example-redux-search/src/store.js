import { createStore, combineReducers, applyMiddleware } from "redux"
import { reducers } from './ducks'
import { searchMiddleware } from './middleware'
const rootReducer = combineReducers(reducers, {})

export const configureStore = () => {
  return createStore(
    rootReducer,
    applyMiddleware(searchMiddleware)
  )
}

