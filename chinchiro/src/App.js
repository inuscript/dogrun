import React, { Component } from 'react';
import './App.css';
import { connect, Provider } from "react-redux"
import { configureStore } from "./store"

class Dice extends Component {
  render(){
    return <span>{this.props.value}</span>
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
      </div>
    );
  }
}

const AppConnected = connect(state => state)(App)
const store = configureStore()

export default () => (
  <Provider store={store} >
    <AppConnected />
  </Provider>
)
