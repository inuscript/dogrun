import { createAction } from 'redux-actions'

export default function (type, key, reducer){
  const payloadCreator = (...params) => {
    return { [key]: reducer(...params) }
  }
  return createAction(type, payloadCreator)
}
