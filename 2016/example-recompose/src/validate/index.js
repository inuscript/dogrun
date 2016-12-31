import React from 'react'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import { connect, Provider } from 'react-redux'

// actions
const changeName = (name) => ({
  type: 'CHANGE_NAME',
  payload: name
})

const changePassword = (password) => ({
  type: 'CHANGE_PASSWORD',
  payload: password
})

const send = (name) => ({
  type: 'SEND',
})

// reducer
const nameReducer = (state = '', action) => {
  switch (action.type) {
    case 'CHANGE_NAME': 
      return action.payload
    default: 
      return state;
  }
}

const passwordReducer = (state = '', action) => {
  switch (action.type) {
    case 'CHANGE_PASSWORD': 
      return action.payload
    default: 
      return state;
  }
}

const errorReducer = (state = {showError: false, errors: []}, action) => {
  switch(action.type){
    case 'SEND':
      return Object.assign({}, state, {
        showError: true
      })
  }
  return state
}

const reducer = combineReducers({
  name: nameReducer,
  password: passwordReducer,
  error: errorReducer
})


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

const nameValidation = ({value}) => {
  if(value.length < 4){
    return ['name least 4 char']
  }
  if(value.length > 12){
    return ['name less 12 char']
  }
  return []
}

const passwordValidation = ({value}) => {
  if(!value){
    return ['Password is must need']
  }
  if(value.match(/^[a-z]+$/) || value.match(/^[1-9]+$/)){
    return ['Password least 1 number and alphabet']
  }
  return []
}

const NameInput = withValidateError(nameValidation)(Input)
const PasswordInput = withValidateError(passwordValidation)(HiddenInput)

const MainComponent = ({dispatch, password, name, error}) => {
  return (
    <div>
      <div>
        <div>name: {name}</div>
        <div>passowrd: {password}</div>
        <NameInput
          label={"name"}
          value={name} 
          onChange={ e => dispatch(changeName(e.target.value))}
          showError={error.showError}
        />
        <PasswordInput 
          label={"password"}
          value={password} 
          onChange={ e => dispatch(changePassword(e.target.value))}
          showError={error.showError}
        />
        <button onClick={ e => dispatch(send())}>send</button>
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
