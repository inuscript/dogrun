import { createStore, combineReducers, applyMiddleware } from "redux"
import { createEpicMiddleware } from "redux-observable"
import { epics } from './epic'

import { createAction, handleActions } from 'redux-actions'
const ping = ()

const reducers = {}

export const configureStore = () => {
  return createStore(
    combineReducers(reducers, {}),
    applyMiddleware(createEpicMiddleware(epics))
  )
}

