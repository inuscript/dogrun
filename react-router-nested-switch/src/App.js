import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Switch, Route } from "react-router-dom"

const AppRoute = () => (
  <Route path="/aaa" render={(props) => {
    console.log(props)
    return <div>aaa1</div>
  }} />
)
const AppRoute2 = () => (
  <div>
    <Route path="/aaa2" render={(props) => {
      console.log(props)
      return <div>aaa2</div>
    }} >
    </Route>
    <Route path="/bbb">
      <div>bbb2</div>
    </Route>
  </div>
)

class App extends Component {
  render() {
    return (
      <BrowserRouter>    
        <div className="App">
          <Switch>
            <AppRoute />
            <AppRoute2 />
          </Switch>
        </div>
      </BrowserRouter>

    );
  }
}

export default App;
