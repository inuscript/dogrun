import React from 'react'
import { createStore, combineReducers, applyMiddleware } from 'redux' 
import { combineEpics, createEpicMiddleware } from 'redux-observable'
import { connect, Provider } from 'react-redux'

const INCREMENT = 'INCREMENT'

const pingEpic = action$ => {
  console.log(action$.ofType('PING'))
  return action$.ofType('PING')
    .mapTo({ type: 'PONG' });
}


export const rootEpic = combineEpics(
  pingEpic
)
const epicMiddleware = createEpicMiddleware(rootEpic);
const enhancer = applyMiddleware(epicMiddleware)

const pingReducer = (state = 0, action) => {
  switch(action.type){
    case 'PING':
      return 'PING'
    case 'PONG':
      return 'PONG'
  }
  return state
}

const reducer = combineReducers({ping: pingReducer})

const store = createStore(reducer, {}, enhancer)

const Counter = ({dispatch, ping}) => {
  return (
    <div>
      {ping}
      <button onClick={ dispatch({type: 'PING'}) }>ping</button>
    </div>
  )
}

export default () => {
  let ConnectedCounter = connect()(Counter)
  return (
    <Provider store={store}>
      <ConnectedCounter />
    </Provider>
  )
}