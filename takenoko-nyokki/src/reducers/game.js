import { combineReducers } from "redux"
import { createReducer } from 'redux-act'
import { start, stop, incrementTime } from '../actions'

// game
const gameState = createReducer({
  [start]: (state, payload, meta) => true,
  [stop]: (state, payload, meta) => false,
}, false)

const timer = createReducer({
  [incrementTime]: (state, payload) => state + 1
}, 0)

const playerNum = createReducer({}, 6)

export default combineReducers({
  gameState, timer, playerNum
})
