import { combineReducers } from 'redux'

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

export default combineReducers({
  name: nameReducer,
  password: passwordReducer,
})

