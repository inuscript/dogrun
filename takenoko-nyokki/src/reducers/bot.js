import { combineReducers } from 'redux'
import { createReducer } from 'redux-act'
import { setupBots } from '../actions'

const setting = createReducer({
  [setupBots]: (state, payload) => payload
}, {})

const num = createReducer({}, 6)

export default combineReducers({
  setting,
  num,
})
