import React from 'react'
import { createStore, applyMiddleware } from 'redux'
import { connect, Provider } from 'react-redux'

const nameReducer = (state = '', action) => {
  switch (action.type) {
    case 'CHANGE_NAME': 
      return action.payload
    default: 
      return state;
  }
}

const changeName = (name) => ({
  type: 'CHANGE_NAME',
  payload: name
})

const store = createStore(nameReducer)

const Input = ({value, onChange}) => (
  <input value={value} onChange={onChange} />
)

const Errors = ({errors}) => {
  if(!errors || errors.length){
    return null
  }
  const errs = errors.map( (err) => (<li>{err}</li>) )
  return <ul style="background:red;color:white">{ errs }</ul>
}

const validate = (validateFunction) => (BaseComponent) => {
  return (props) => {
    const errors = validateFunction(props)
    const appendProps = {
      errors: errors
    }
    return (
      <div>
        <Errors errors={errors} />
        <BaseComponent {...props} />
      </div>
    )
  }
}

const MainComponent = ({dispatch, name, errors}) => {
  return (
    <div>
      <div>
        <div>name: {name}</div>
        <Input value={name} onChange={ e => dispatch(changeName(e.target.value))}/>
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
