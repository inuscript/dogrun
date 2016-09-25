import React, { Component } from 'react';

export default class Avater extends Component{
  constructor(){
    super()
    this.state = {
      loadComplete: false
    }
  }
  componentWillMount(props){
    // loadingSomething(props.name)
    setTimeout( () => {
      this.setState({
        loadComplete: true,
        name: "hogehoge",
        description: "fugafuga"
      })
    }, 1000)
  }
  render(){
    if(this.state.loadComplete){
      return <div>お待ち下さい・・・・</div>
    }
    return <div>
      <div>{this.state.name}</div>
    </div>
  }
}