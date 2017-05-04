import { combineReducers, createStore, applyMiddleware } from "redux"
// import { middleware } from "./epic-zen"
// import { middleware } from "./epic-rxjs"
// import { middleware } from "./epic-most"
import { middleware } from "./epic-plain"
// import { middleware } from "./epic-promise"

// reducer
const number = (state = 0, action ) => {
  switch(action.type){
    case "CHANGE":
      return action.payload
    default:
      return state
  }
}

const logger = store => next => action => {
  console.log('dispatching', action)
  let result = next(action)
  // console.log('next state', store.getState())
  return result
}

// store
const reducer = combineReducers({
  number
})

export const configureStore = () => {
  return createStore(reducer, applyMiddleware(middleware, logger))
}