import { actions } from './ducks'
import { searchApi } from './api'

export const searchMiddleware = store => next => action => {
  if(action.type !== actions.CHANGE_INPUT){
    // SKIP
    return next(action)
  }
  searchApi(action.payload)
    .then( result => {
      console.log(result)
    })
  return next(action)
}