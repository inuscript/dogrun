import React from 'react'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import { connect, Provider } from 'react-redux'

const nameReducer = (state = '', action) => {
  switch (action.type) {
    case 'CHANGE_NAME': 
      return action.payload
    default: 
      return state;
  }
}

const reducer = combineReducers({
  name: nameReducer
})

const changeName = (name) => ({
  type: 'CHANGE_NAME',
  payload: name
})

const store = createStore(reducer, {})

const Input = ({value, onChange}) => (
  <input value={value} onChange={onChange} />
)

const Errors = ({errors}) => {
  if(!errors || errors.length === 0){
    return null
  }
  const errs = errors.map( (err, i) => (<li key={err}>{err}</li>) )
  const style = {background:"red", color:"white"}
  return <ul style={style}>{ errs }</ul>
}

const withValidateError = (validateFunction) => (BaseComponent) => {
  return (props) => {
    const errors = validateFunction(props)
    const appendProps = {
      errors: errors
    }
    return (
      <div>
        <Errors errors={errors} />
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

const MainComponent = ({dispatch, name, errors}) => {
  return (
    <div>
      <div>
        <div>name: {name}</div>
        <NameInput value={name} onChange={ e => dispatch(changeName(e.target.value))}/>
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
