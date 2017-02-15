import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from "react-router"

export const SomeRouter = ({path = ""}) => {
  return (
    <Switch>
      <Route path={`${path}/foo`}><div className="foo">foo</div></Route>
      <Route path={`${path}/baz`}><div className="baz">baz</div></Route>
      <Route path={`${path}/shallow`}><div><div className="shallowTarget">shallow</div></div></Route>
      <Route><div className="default">default</div></Route>
    </Switch>
  )
}

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <SomeRouter />
      </BrowserRouter>
    );
  }
}

export default App;
