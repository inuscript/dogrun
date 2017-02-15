import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from "react-router"
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/foo"><div>foo</div></Route>
          <Route path="/baz"><div>baz</div></Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
