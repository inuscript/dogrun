import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import { connect, Provider } from "react-redux"
import { configureStore } from "./store"
import { changeRandom } from "./action"

class App extends Component {
  render() {
    return (
      <div className="App">
        <div>{this.props.number}</div>
        <div>
          <button onClick={
            () => this.props.dispatch(changeRandom())
          }>random</button>
        </div>
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