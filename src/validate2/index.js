import React from 'react'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import { connect, Provider } from 'react-redux'
import * as validators from './validatiors'
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

const Errors = ({errors, showError}) => {
  if(!errors || errors.length === 0 || !showError){
    return null
  }
  const errs = errors.map( (err, i) => (<li key={err}>{err}</li>) )
  const style = {background:"red", color:"white"}
  return <ul style={style}>{ errs }</ul>
}

const withValidateError = (validateFunction) => (BaseComponent) => {
  return (props) => {
    const errors = validateFunction(props)
    const { showError } = props
    const appendProps = {
      errors: errors
    }
    return (
      <div>
        <Errors errors={errors} showError={showError}/>
        <BaseComponent {...props} {...appendProps}/>
      </div>
    )
  }
}


const NameInput = withValidateError(validators.nameValidation)(Input)
const PasswordInput = withValidateError(validators.passwordValidation)(HiddenInput)

const MainComponent = ({dispatch, password, name, error}) => {
  return (
    <div>
      <div>
        <NameInput
          label={"name"}
          value={name} 
          onChange={ e => dispatch(actions.changeName(e.target.value))}
          showError={error.showError}
        />
        <PasswordInput 
          label={"password"}
          value={password} 
          onChange={ e => dispatch(actions.changePassword(e.target.value))}
          showError={error.showError}
        />
        <button onClick={ e => dispatch(actions.send())}>send</button>
      </div>
    </div>
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
