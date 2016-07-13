import React from 'react'
import { combineEpics, createEpicMiddleware } from 'redux-observable'
import { connect, Provider } from 'react-redux'

const pingEpic = action$ =>
  action$.filter(action => action.type === 'PING')
    .mapTo({ type: 'PONG' });

export const rootEpic = combineEpics(
  pingEpic
)

const epicMiddleware = createEpicMiddleware(rootEpic);


export default () => {
  return (
    <div>rx</div>
  )
}