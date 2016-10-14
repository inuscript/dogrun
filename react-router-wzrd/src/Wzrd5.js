import React, { Component, PropTypes } from 'react'
import Router from 'react-router/BrowserRouter'
import { Match, Link, Redirect } from 'react-router'

const First = ({nextToBase}) => {
  return <div>
    <div>First</div>
    <Link to={nextToBase} />
  </div>
}
const Second = () => <div>Second</div>
const Third = () => <div>Third</div>

const withNextLinkBase = (Component) => {
  return (...props) => {
    return <Component />
  }
}

const Navigation = (props) => {
  console.log(props)
  const nextTo = wizardLink(props.pathname)
  return <Link to={nextTo}>next</Link>
}


export default () => {
  return <Router>
    <div>
      {/* components */}
      <Match pattern="/" exactly component={First} />
    </div>
  </Router>
}