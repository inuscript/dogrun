import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from "react-router"

export const SomeRouter = ({path = ""}) => {
  return (
    <Switch>
      <Route path={`${path}/foo`}><div className="foo">foo</div></Route>
      <Route path={`${path}/baz`}><div className="baz">baz</div></Route>
      <Route path={`${path}/mount`}><div><div className="testTarget">shallow</div></div></Route>
      <Route><div className="default">default</div></Route>
    </Switch>
  )
}

class App extends Component {
  render() {
    // RouterとRoute定義は分けておくとテストしやすい
    return (
      <BrowserRouter>
        <SomeRouter />
      </BrowserRouter>
    );
  }
}


const Hello = ({match}) => (
  <div>Hello {match.params.name}</div>
)
const NotFound = () => (
  <div>Oops</div>
)
export const DynamicRouter = ({path = ""}) => {
  return (
    <Switch>
      <Route path={`${path}/user/:name`} component={Hello}></Route>
      <Route component={NotFound}></Route>
    </Switch>
  )
}

export default App;
