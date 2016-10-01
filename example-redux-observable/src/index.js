import React from 'react'
import { createStore, combineReducers, applyMiddleware } from 'redux' 
import { combineEpics, createEpicMiddleware } from 'redux-observable'
import { connect, Provider } from 'react-redux'

import 'rxjs/add/operator/mapTo'

const pingEpic = action$ => {
  return action$
    .ofType('PING')
    .mapTo({ type: 'PONG' });
}


export const rootEpic = combineEpics(
  pingEpic
)
const epicMiddleware = createEpicMiddleware(pingEpic);

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

const store = createStore(reducer, {} 
  , applyMiddleware(epicMiddleware)
)

const Counter = ({dispatch, ping}) => {
  return (
    <div>
      {ping}
      <button onClick={ (e) => dispatch({type: 'PING'}) }>ping</button>
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