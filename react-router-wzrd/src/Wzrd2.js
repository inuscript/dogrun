// Redirect pattern
import React, { Component } from 'react'
import Router from 'react-router/BrowserRouter'
import { Match, Link, Redirect } from 'react-router'

const First = () => <div>First</div>
const Second = () => <div>Second</div>
const Third = () => <div>Third</div>

const witnNext = (name, Component) => {
  return (props) => {
    return <div>
      <Component {...props} />
      <Next name={name}/>
    </div>
  }
}

const Next = ({name}) => {
  return <Link to={{
    pathname: "/next",
    state: {
      name: name
    }
  }}>Next</Link>
}

const NFirst = witnNext("first", First)
const NSecond = witnNext("second", Second)
const NThird = witnNext("third", Third)

export default () => {
  return <Router>
    <div>
      <Match pattern="/" exactly component={NFirst} />
      <Match pattern="/2" exactly component={NSecond} />
      <Match pattern="/3" exactly component={NThird} />
      <Match pattern="/next" render={ ({location}) => {
        const {name} = location.state
        switch(name){
          case "first": {
            return <Redirect to="/2"/>
          }
          case "second": {
            return <Redirect to="/3" />
          }
          default: {
            return <Redirect to="/" />
          }
        }
      } }/>
    </div>
  </Router>
}