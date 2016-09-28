
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


const WaitMessage = () => (<div>お待ち下さい・・・・</div>)
const Profile = ({thumbUrl, name, description}) => {
  return (
    <div>
      <div>
        <img src={thumbUrl} />
      </div>
      <div> @{name} </div>
      <div> {description} </div>
    </div>
  )
}

export default class ProfileContainer extends Component{
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
    if(!this.state.loadComplete){
      return <WaitMessage />
    }
    return <Profile {...this.state} />
  }
}