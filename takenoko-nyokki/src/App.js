import React, { Component } from 'react';
import { Provider, connect } from 'react-redux'
import { configureStore } from './store'
import { actions } from './core'
import DevTools from './DevTools'

const Takenoko = ( { start } ) => {
  return (
    <div>
      <button onClick={ _ => start() }>Start</button>
    </div>
  )
}

const Container = connect(state => state, actions)(Takenoko)

class App extends Component {
  constructor(){
    super()
    this.store = configureStore()
  }
  render() {
    return (
      <Provider store={this.store}>
        <div>
          <Container/>
          <DevTools />
        </div>
      </Provider>
    )
  }
}

export default App;
