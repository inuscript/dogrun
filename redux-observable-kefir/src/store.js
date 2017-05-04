import { combineReducers, createStore, applyMiddleware } from "redux"
import { combineEpics, createEpicMiddleware } from "redux-observable"
import mostAdapter from 'redux-observable-adapter-most';
import { ofType } from 'redux-observable-adapter-most';
import { from } from 'rxjs/observable/from';
import ZenObservable from "zen-observable"
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
const randomEpic = (action$) => {
  return ZenObservable.from(action$)
    .filter((action) => {
      return action.type === "RANDOM"
    })
    .map(() => {
      return changeNumber(Math.random())
    })
}
// middleware
const epics = combineEpics(randomEpic)
const middleware = createEpicMiddleware(epics, {
  // adapter: mostAdapter
  adapter : {
    input : input$ => (new ZenObservable(obs => input$.subscribe(obs))),
    output : output$ => from(output$)
  }
})

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