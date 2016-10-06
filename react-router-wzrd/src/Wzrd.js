import React, { Component } from 'react'

import Router from 'react-router/HashRouter'
import { Match, Link } from 'react-router'

const First = () => (
  <div>
    <div>First</div>
    <Link to="/2">next</Link>
  </div>
)
const Second = () => (
  <div>
    <div>Second</div>
    <Link to="/3">next</Link>
  </div>
)
const Third = () => <div>Third</div>

export default () => {
  return <Router>
    <div>
      <Match pattern="/" exactly component={First} />
      <Match pattern="/2" component={Second} />
      <Match pattern="/3" component={Third} />
    </div>
  </Router>
}