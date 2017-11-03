import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import store from "./store"
// import { mapActions } from "vuex"

const Item = ({ state, actions }) => {
  return (
    <div className="App">
      <div>count: {state.count}</div>
      <button onClick={actions.increment}>
        Increment
      </button>
    </div>
  )
}

const mapActions = (keys, store) => {
  let dispatch = store.dispatch
  const res = {}
  keys.forEach( (key) => {
    res[key] = function (...args) {
      dispatch.apply(store, [key].concat(args))
    }
  })
  return res
}

class App extends Component {
  constructor(){
    super()
    this.state = store.state
    store.subscribe( (_, state) => {
      this.setState(state)
    })
  }
  render() {
    const actions = mapActions(["increment"], store)
    return (
      <div className="App">
        <Item state={this.state} actions={actions} />
      </div>
    );
  }
}

export default App;
