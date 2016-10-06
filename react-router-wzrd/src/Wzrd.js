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
    <Link to={{
      pathname: "/2",
      query: { sort: 'name' },
      state: { fromDashboard: true }
    }}>next</Link>
  </div>
)
const Second = (props) => {
  console.log(props)
  return (
    <div>
      <div>Second</div>
      {/* <WizerdLink>next</WizerdLink> */}
      <Match pattern="/3" component={Third} />
      <Link to="/3">next</Link>
    </div>
  )
}
const Third = () => <div>Third</div>

export default () => {
  return <Router>
    <div>
      <Match pattern="/2" component={Second} />
      <Match pattern="/" exactly component={First} />
    </div>
  </Router>
}