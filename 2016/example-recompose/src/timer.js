const React = require('react')
const { Component } = React
const { withState, compose, withHandlers } = require('recompose')

const Timer = ({time}) => {
  return <div>{time.toString()}</div>
}

const enhancer = BaseComponent => {
  return class extends Component{
    constructor(){
      super()
      this.state = {
        time: new Date()
      }
      // 500msに1度state update
      setInterval( () => {
        this.setState({ time : new Date() })
      }, 500)
    }
    render(){
      return <BaseComponent time={this.state.time} />
    }
  } 
}
module.exports = enhancer(Timer)