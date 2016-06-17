import React, {Component} from 'react'

const Text = ({text, count, onChange}) => {
  return (<div>
    <div>{count}</div>
    <textarea value={text} onChange={onChange}></textarea>
  </div>)
}

export default class TextCounter extends Component{
  constructor(){
    super()
    this.state = {
      text: ""
    }
  }
  render(){
    return <Text 
      text={this.state.text} 
      count={this.state.text.length} 
      onChange={ e => {
        // console.log(e)
        // console.log(e.target.value)
        this.setState({text: e.target.value})
      }}
      />
  }
}