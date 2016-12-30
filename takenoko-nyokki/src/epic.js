import Rx from "rxjs"
import { combineEpics } from "redux-observable"
import * as actions from './actions'

const startTimerEpic = (action$, store) =>
  action$.ofType(actions.start.getType())
    .switchMap( () => Rx.Observable.interval(1000) )
    .map( () => actions.incrementTime( store.getState().game.timer + 1 ))

const setupBotEpic = (action$, store) =>
  action$.ofType(actions.start.getType())
    .map( m => {
      const { game } = store.getState()
      const bots = [...Array(game.playerNum).keys()].map( (i) => ({
        name: `Player Bot ${i}`,
        timing: Math.ceil(Math.random() * (game.timeout - 1))
      }))
      return actions.setupBots(bots)
    })

const tickHandsupEpic = (action$, store) =>
  action$.ofType(actions.incrementTime.getType())
    .map(m => {
      const { bots } = store.getState()
      console.log(bots)
      return { type: "DUMMY"}
    })

export const epics = combineEpics(
  startTimerEpic,
  setupBotEpic,
  tickHandsupEpic
)