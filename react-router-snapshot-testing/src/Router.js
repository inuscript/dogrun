import React from "react"
import { Switch, Route } from "react-router"

export default ({path = ""}) => {
  return <Switch>
    <Route path={`${path}/foo`}><div className="foo">foo</div></Route>
    <Route path={`${path}/baz`}><div className="baz">baz</div></Route>
    <Route path={`${path}/shallow`}><div><div className="shallowTarget">shallow</div></div></Route>
    <Route><div className="default">default</div></Route>
  </Switch>
}