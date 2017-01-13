import React, { Component } from 'react'
import { Provider, connect } from 'react-redux'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { createAction } from 'redux-actions'
import epicMiddleware from './epic'

const countUp = createAction("ADD")

const actions = {
  countUp
}

const counter = (state = 0, {type, payload} ) => {
  switch(type){
    case "ADD":
      return state + payload
  }
  return state
}
const fizzBuzz = (state = "", {type, payload}) => {
  switch(type){
    case "FIZZBUZZ":
      return payload
    case "RESET":
      return ""
  }
  return state
}
const reducer = combineReducers({
  counter, fizzBuzz
})
const store = createStore(reducer, applyMiddleware(epicMiddleware))

const Counter = ( {counter, fizzBuzz, countUp} ) => {
  return <div>
    <button onClick={() => countUp(1)}>count</button>
    <div>
      <div>{counter}</div>
      <div>{fizzBuzz}</div>
    </div>
  </div>
}
const CounterApp = connect(state => state, actions)(Counter)

export default class extends Component{
  render(){
    return (
      <Provider store={store}>
        <CounterApp />
      </Provider>
    )
  }
}