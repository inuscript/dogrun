import Rx from "rxjs"
import { combineEpics } from "redux-observable"
import * as actions from './actions'

const startTimerEpic = (action$) =>
  action$.ofType(actions.start.getType())
    .switchMap( () => Rx.Observable.interval(1000) )
    .map( () => actions.incrementTime())

const setupHandsEpic = (action$, store) =>
  action$.ofType(actions.start.getType())
    .map( m => {
      console.log(store.getState().playerNum)
    })

export const epics = combineEpics(
  startTimerEpic,
  setupHandsEpic
)