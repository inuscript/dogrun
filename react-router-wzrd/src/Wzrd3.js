import React, { Component, PropTypes } from 'react'
import Router from 'react-router/BrowserRouter'
import { Match, Link, Redirect } from 'react-router'

const First = () => <div>First</div>
const Second = () => <div>Second</div>
const Third = () => <div>Third</div>

class LooseLeafProvider extends React.Component {
  static childContextTypes = {
    looseLeaf: PropTypes.array
  }

  static propTypes = {
    looseLeaf: PropTypes.array,
    children: PropTypes.node
  }

  getChildContext() {
    return {
      looseLeaf: this.props.routes
    }
  }

  render() {
    return React.Children.only(this.props.children)
  }
}

const findNext = (current)

class LooseLink extends React.Component{
  static contextTypes = {
    looseLeaf: PropTypes.array
  }
  render(){
    const { to } = this.props
    return 
  }
}

const leafs = [{
  path: "/1"
}, {
  path: "/2"
}]

export default () => {
  return <Router>
    <LooseLeafProvider leafs={leafs} >
      <Match pattern="/" exactly component={NFirst} />
      <Match pattern="/2" exactly component={NSecond} />
      <Match pattern="/3" exactly component={NThird} />
    </LooseLeafProvider>
  </Router>
}