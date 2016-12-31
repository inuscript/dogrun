import React, {Component} from 'react'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import branch from 'recompose/branch'
import mapProps from 'recompose/mapProps'
import compose from 'recompose/compose'
import renderNothing from 'recompose/renderNothing'
import { connect, Provider } from 'react-redux'
import validateAll , * as validators from '../validate2/validators'
import * as actions from '../validate2/actions'
import reducer from '../validate2/reducer'

// store
const store = createStore(reducer, {})

//view
const Input = ({label, value, onChange}) => (
  <div>
    <span>{label}</span>
    <input value={value} onChange={onChange} />
  </div>
)

const HiddenInput = ({label, value, onChange}) => (
  <div>
    <span>{label}</span>
    <input type="password" value={value} onChange={onChange} />
  </div>
)

// あれ？dispatch渡すのにRerender時に構築するタイミングだとうまくいかないやつどなんだっけ
const MyFormFields = ({dispatch, password, name}) => (
  <div>
    <Input
      label={"name"}
      value={name} 
      onChange={ e => dispatch(actions.changeName(e.target.value))}
    />
    <HiddenInput
      label={"password"}
      value={password} 
      onChange={ e => dispatch(actions.changePassword(e.target.value))}
    />
  </div>
)

const MyForm = withValidateForm({onSend: (e) => {
  
}})(MyFormFields)

const MainComponent = (props) => {
  return (
    <MyForm {...props} />
  )
}

let Container = connect( state => state )(MainComponent)

// Build App
export default () => {
  return (
    <Provider store={store}>
      <Container />
    </Provider>
  )
}
