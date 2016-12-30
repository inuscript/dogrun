import {  createReducer } from 'redux-act'
import { handsUp } from '../actions'

export default createReducer({
  [handsUp]: (state, {playerNum}) => {
    // return Object.assign({},
    return {
      ...state,
      [playerNum]: true
    }
    // )
  }
}, {})