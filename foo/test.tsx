import * as React from 'react'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import { connect } from "react-redux"

const ConnectedComponent = connect(
  (state) => {
    return { ...state }
  },
  () => ({})
)((props) => {
  return <div>
    <h2>Empty Props Connected Class</h2>
  </div>
})

const Routing = () => (
  <Router>
    <Route path="/connected" component={ConnectedComponent} />
  </Router>
)
