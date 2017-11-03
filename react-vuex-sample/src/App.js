import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import store from "./store"

store.subscribe( (_, state) => {
  console.log("aaa", state)
})
const Item = ({ store, state }) => {
  return (
    <div className="App">
      <div>
        count: {state.count}
      </div>
      <button onClick={() => {
        store.commit("increment")
      }}>Increment</button>
    </div>
  )
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
    return (
      <div className="App">
        <Item store={store} state={this.state} />
      </div>
    );
  }
}

export default App;
