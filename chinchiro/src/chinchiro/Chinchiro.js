import React, { Component } from 'react';
import './App.css';
import { connect, Provider } from "react-redux"
import { configureStore } from "./redux/store"
import { startRoll } from "./redux/action"

class Dice extends Component {
  render(){
    const { value } = this.props
    if(value === null){
      return "-"
    }
    return value
  }
}

const Money = ({money}) => <div>money: ${money}</div>

class App extends Component {
  render() {
    const { dices, dispatch , money } = this.props
    return (
      <div className="App">
        <Money money={money} />
        {Object.entries(dices).map( ([i, d]) => {
          return <Dice value={d} key={i} />
        })}
        <div>
          <button onClick={() => dispatch(startRoll()) } >
            Roll!
          </button>
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
