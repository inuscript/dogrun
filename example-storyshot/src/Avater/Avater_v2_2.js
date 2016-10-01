import React, { Component } from 'react';
import fetchAccount from './fetchAccount'
import branch from 'recompose/branch'
import renderComponent from 'recompose/renderComponent'

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
const withWait = branch(
  ({loadComplete}) => loadComplete,
  t => t,
  renderComponent(WaitMessage)
)
const ProfileWithWait = withWait(ProfileItem)

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
    return <ProfileWithWait {...this.state} />
  }
}