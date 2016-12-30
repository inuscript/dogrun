import { combineReducers } from "redux"
import { createReducer } from 'redux-act'
import * as actions from './actions'

const game = combineReducers({
  gameState: createReducer({
    [actions.start]: (state, payload, meta) => true,
    [actions.stop]: (state, payload, meta) => false,
  }, false),
  timer: createReducer({
    [actions.incrementTime]: (state, payload) => state + 1
  }, 0),
  playerNum: () => 6,
  timeout: () => 30
})

const bots = createReducer({
  [actions.setupBots]: (state, payload) => payload
}, [])

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
  bots,
  game,
  hands
})