import Rx from "rxjs"
import { combineEpics } from "redux-observable"
import * as actions from './actions'

const startEpic = (action$, store) =>
  action$.ofType(actions.start.getType())
    .switchMap( () => Rx.Observable.interval(1000) )
    .map( m => {
      return actions.incrementTime()
    })

export const epics = combineEpics(
  startEpic
)