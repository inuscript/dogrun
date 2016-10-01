import React, { Component } from 'react';
import fetchAccount from './fetchAccount'

const WaitMessage = () => (<div>お待ち下さい・・・・</div>)
const ProfileItem = ({thumbUrl, name, description}) => {
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

const Profile = ({loadComplete, data}) => {
  if(!loadComplete){
    return <WaitMessage />
  }
  return <ProfileItem {...data} />
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
          data: {
            name,
            description,
            thumbUrl,
          }
        })
      })
  }
  render(){
    return <Profile {...this.state} />
  }
}