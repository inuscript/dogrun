
import React, { Component } from 'react';

// Mock fetch request
const fetchAccount = (name) => {
  return new Promise( (res, rej ) => {
    setTimeout( () => {
      res({name,
        description: "おはようございます",
        thumbUrl: "https://pbs.twimg.com/profile_images/622925791416881152/gDKsJVcW_bigger.png"})
    },1000)
  })
}

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