import React, {Component} from 'react'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import { connect, Provider } from 'react-redux'
import validateAll , * as validators from './validators'
import * as actions from './actions'
import reducer from './reducer'


const errorReducer = (state = {showError: false, errors: []}, action) => {
  switch(action.type){
    case 'SEND':
      return Object.assign({}, state, {
        showError: true
      })
  }
  return state
}

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

const Errors = ({errors}) => {
  if(!errors || errors.length === 0){
    return null
  }
  const errs = errors.map( (err, i) => (<li key={err}>{err}</li>) )
  const style = {background:"red", color:"white"}
  return <ul style={style}>{ errs }</ul>
}

const ErrorsList = ({errorMap, showError}) => {
  if(!errorMap || !showError){
    return null
  }
  const errors = Object.keys(errorMap).map((k) => {
    const v = errorMap[k]
    return <Errors key={k} errors={v} />
  })
  return <div>{errors}</div>
}

const withValidateForm = ({ onSend, validator }) => (InputComponents) => {
  return class ValidateForms extends Component{
    constructor(props){
      super(props)
      this.state = {
        errors: {},
        showError: false
      }
    }
    handleSend(e){
      this.setState({
        errors: validateAll(this.props),
        showError: true
      }, () => {
        onSend(e) // HOCs setting        
      })
    }
    render(){
      const { state, props } = this
      return (
        <div>
          <ErrorsList errorMap={state.errors} showError={state.showError} />
          <InputComponents {...props} />
          <button onClick={ e => this.handleSend(e)}>send</button>
        </div>
      )
    }
  }
}

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
