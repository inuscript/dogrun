import { combineReducers } from "redux"
import { createAction, createReducer } from 'redux-act'

const start = createAction("start")
const stop = createAction("stop")

export const actions = {
  start, stop
}

const game = createReducer({
  [start]: (state, payload, meta) => true,
  [stop]: (state, payload, meta) => false,
}, false)

export const reducers = combineReducers({ game })
