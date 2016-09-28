import React, { Component } from 'react'
import fetchAccount from './fetchAccount'

export default class Profile extends Component{
  constructor(){
    super()
    this.state = {
      loadComplete: false
    }
  }
  componentWillMount(props){
    fetchAccount(this.props.account)
      .then( ({name, description, thumbUrl}) => {
        this.setState({
          loadComplete: true,
          name,
          description,
          thumbUrl,
        })
      })
  }
  render(){
    const {thumbUrl, name, description, loadComplete } = this.state
    if(!loadComplete){
      return <div>お待ち下さい・・・・</div>
    }
    return <div>
      <div>
        <img src={thumbUrl} />
      </div>
      <div> @{name} </div>
      <div> {description}</div>
    </div>
  }
}