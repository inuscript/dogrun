import React, { Component, PropTypes } from 'react'
import Router from 'react-router/BrowserRouter'
import { Match, Link, Redirect } from 'react-router'

const First = () => <div>First</div>
const Second = () => <div>Second</div>
const Third = () => <div>Third</div>

const wizardLink = (pathname) => {
  switch(pathname){
    case '/':
      return '/2'
    case '/2':
      return '/3'
  }
  return '/'
}

const Navigation = (props) => {
  console.log(props)
  const nextTo = wizardLink(props.pathname)
  return <Link to={nextTo}>next</Link>
}

export default () => {
  return <Router>
    <div>
      <Match pattern="/" exactly component={First} />
      <Match pattern="/2" exactly component={Second} />
      <Match pattern="/3" exactly component={Third} />
      <Match pattern="/*" component={Navigation} />
    </div>
  </Router>
}