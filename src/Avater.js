
import React, { Component } from 'react';

const loadingSomething = (name) => {
  return new Promise( (res, rej ) => {
    setTimeout( () => {
      res(name, "fugafuga")
    },1000)
  })
}

export default class Avater extends Component{
  constructor(){
    super()
    this.state = {
      loadComplete: false
    }
  }
  componentWillMount(props){
    loadingSomething(this.props.name)
      .then( (name, description) => {
        this.setState({
          loadComplete: true,
          name,
          description
        })
      })
  }
  render(){
    if(!this.state.loadComplete){
      return <div>お待ち下さい・・・・</div>
    }
    return <div>
      <div>name: {this.state.name}</div>
    </div>
  }
}