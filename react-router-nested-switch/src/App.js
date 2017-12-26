import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Switch, Route } from "react-router-dom"

const SwitchWithNotFound = ({prefix, children}) => (
  <Switch>
    {children}
    <Route path={prefix} render={(props) => {
      return <div>not found</div>
    }} />
  </Switch>
)

const CommentRoute = () => (
  <SwitchWithNotFound prefix="/comment">
    <Route path="/comment/aaa" render={(props) => {
      console.log(props)
      return <div>aaa1</div>
    }} />
  </SwitchWithNotFound>
  
)
const MenuRoute = () => (
  <SwitchWithNotFound prefix="/menu">
    <Route path="/menu/aaa2" render={(props) => {
      console.log(props)
      return <div>aaa2</div>
    }} >
    </Route>
    <Route path="/menu/bbb">
      <div>bbb2</div>
    </Route>
  </SwitchWithNotFound>
)

class App extends Component {
  render() {
    return (
      <BrowserRouter>    
        <div className="App">
          <CommentRoute />
          <MenuRoute />
        </div>
      </BrowserRouter>

    );
  }
}

export default App;
