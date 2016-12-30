import { createStore, applyMiddleware, compose } from "redux"
import { createEpicMiddleware } from "redux-observable"
import { epics } from './epic'
import DevTools from './DevTools'
import { reducers } from './core'

export const configureStore = () => {
  return createStore(
    reducers,
    compose(
      applyMiddleware(createEpicMiddleware(epics)),
      DevTools.instrument()
    )
  )
}

