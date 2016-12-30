import { combineReducers } from "redux"
import { createReducer } from 'redux-act'
import * as actions from '../actions'

const game = combineReducers({
  gameState: createReducer({
    [actions.start]: (state, payload, meta) => true,
    [actions.stop]: (state, payload, meta) => false,
  }, false),
  timer: createReducer({
    [actions.incrementTime]: (state, payload) => state + 1
  }, 0),
  playerNum: createReducer({
    [actions.resetGame]: (state, payload) => 6
  }, 6)
})

const bot = combineReducers({
  setting: createReducer({
    [actions.setupBots]: (state, payload) => payload
  }, {}),
  num: createReducer({}, 6)
})

const hands = createReducer({
  [actions.handsUp]: (state, {playerNum}) => {
    // return Object.assign({},
    return {
      ...state,
      [playerNum]: true
    }
    // )
  }
}, {})


export default combineReducers({
  bot,
  game,
  hands
})