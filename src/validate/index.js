import React from 'react'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import { connect, Provider } from 'react-redux'

// reducer
const nameReducer = (state = '', action) => {
  switch (action.type) {
    case 'CHANGE_NAME': 
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
  error: errorReducer
})

// actions
const changeName = (name) => ({
  type: 'CHANGE_NAME',
  payload: name
})

const send = (name) => ({
  type: 'SEND',
})

// store
const store = createStore(reducer, {})

//view
const Input = ({value, onChange}) => (
  <input value={value} onChange={onChange} />
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

const NameInput = withValidateError(nameValidation)(Input)

const MainComponent = ({dispatch, name, error}) => {
  return (
    <div>
      <div>
        <div>name: {name}</div>
        <NameInput value={name} 
          onChange={ e => dispatch(changeName(e.target.value))}
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
