import React, { Component } from 'react';
import { createStore } from 'redux'
import { Provider, connect } from 'react-redux'
import updeep from 'updeep'
import { createAction } from 'redux-actions'

const initialState = {
  counter: 0
}

const reducer = (state = initialState, { payload } ) => {
  if(typeof payload !== "object"){
    return state
  }
  return updeep(payload, state)
}

const increment = createAction('INCREMENT', () => ({ counter: (i) => i + 1 }))
const decrement = createAction('DECREMENT', () => ({ counter: (i) => i - 1 }))
const actions = {
  increment, decrement
}

const Counter = ({increment, decrement, counter}) => {
  return (
    <div>
      <div>{counter}</div>
      <button onClick={increment}>increment</button>
      <button onClick={decrement}>decrement</button>
    </div>
  )
}
const CounterContainer = connect(state => state, actions)(Counter)

class App extends Component {
  constructor(){
    super()
    this.store = createStore(reducer)
  }
  render() {
    return (
      <Provider store={this.store}>
        <CounterContainer />
      </Provider>
    );
  }
}

export default App;
