import React, {Component} from 'react'
import mapProps from 'recompose/mapProps'
import withHandlers from 'recompose/withHandlers'
import compose from 'recompose/compose'
// import { compose, defaultProps, mapProps, withProps, renderComponent, createEagerComponent } = require('recompose')

const Text = ({text, count, onChange}) => {
  return (<div>
    <div>{count}</div>
    <textarea value={text} onChange={onChange}></textarea>
  </div>)
}

const withCount = mapProps( ({text}) => {
  return {
    text: text,
    count: text.length
  }
})
let withChangeHandler = withHandlers({
  onChange: (e) => {
    this.setState({text: e.target.value})
  }
})

export default class TextCounter extends Component{
  constructor(){
    super()
    this.state = {
      text: ""
    }
  }
  render(){
    let enhancer = compose(
      withCount,
      withChangeHandler
    )
    let wrap = enhancer(Text)
    console.log(wrap)
    return wrap({text: this.state.text})
    // return <Text 
    //   text={this.state.text} 
    //   count={this.state.text.length} 
    //   onChange={ e => {
    //     // console.log(e)
    //     // console.log(e.target.value)
    //     this.setState({text: e.target.value})
    //   }}
    //   />
  }
}