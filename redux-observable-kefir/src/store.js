import { combineReducers, createStore, applyMiddleware } from "redux"
import { combineEpics, createEpicMiddleware } from "redux-observable"
import mostAdapter from 'redux-observable-adapter-most';
import { ofType } from 'redux-observable-adapter-most';

// reducer
const number = (state = 0, action ) => {
  switch(action.type){
    case "CHANGE":
      return action.payload
  }
  return state
}

// action
export const changeNumber = (number) => ({
  type: "CHANGE",
  payload: number
})

// epics
const randomEpic = (action$) => (
  ofType("RANDOM", action$)
    .map(() => {
      return changeNumber(Math.random())
    })
)
// middleware
const epics = combineEpics(randomEpic)
const middleware = createEpicMiddleware(epics, {
  adapter: mostAdapter
})



// store
const reducer = combineReducers({
  number
})

export const configureStore = () => {
  return createStore(reducer, applyMiddleware(middleware))
}