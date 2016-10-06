import React, { Component } from 'react'

import Router from 'react-router/BrowserRouter'
import { Match, Link } from 'react-router'

class WizerdLink extends Component {
  render(){
    const props = this.props
    return <Link to="/2" {...props}>{
      ({isActive, location, href, onClick, transition}) => {
        return <button onClick={onClick}>{props.children}</button>
      }
    }</Link>
  }
}

const First = () => (
  <div>
    <div>First</div>
    <Match pattern="/2" component={Second} />
    <Link to="/2">next</Link>
  </div>
)
const Second = () => (
  <div>
    <div>Second</div>
    {/* <WizerdLink>next</WizerdLink> */}
    <Match pattern="/3" component={Third} />
    <Link to="/3">next</Link>
  </div>
)
const Third = () => <div>Third</div>

export default () => {
  return <Router>
    <div>
      <Match pattern="/" exactly component={First} />
    </div>
  </Router>
}