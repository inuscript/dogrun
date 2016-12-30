import Rx from "rxjs"
import { combineEpics } from "redux-observable"
import * as actions from './actions'

// 時計進める
const startTimerEpic = (action$, store) =>
  action$.ofType(actions.start.getType())
    .switchMap( () => Rx.Observable.interval(1000) )
    .map( () => actions.incrementTime( store.getState().game.timer + 1 ))

// 初期セットアップ
const setupBotEpic = (action$, store) =>
  action$.ofType(actions.start.getType())
    .map( m => {
      const { game } = store.getState()
      const bots = [...Array(game.playerNum).keys()].map( (i) => ({
        botId: i,
        name: `Player Bot ${i}`,
        handsupTiming: Math.ceil(Math.random() * (game.timeout - 1))
      }))
      return actions.setupBots(bots)
    })


const handsUpOnTime = (currentTime, botHandupTime, botId) => {
  if(currentTime === botHandupTime){
    return actions.handsUp(botId)
  }
  return false
}

// 必要なタイミングでbotに手を上げさせる
// TODO: めっちゃ汚い
const tickHandsupEpic = (action$, store) =>
  action$.ofType(actions.incrementTime.getType())
    .map(m => {
      const { bots } = store.getState()
      const r = bots.map( ({botId, handsupTiming}) => handsUpOnTime(
        m.payload, handsupTiming, botId
      )).filter( action => !!action )
      return r[0] ? r[0] : { type: "DUMMY"}
    })

export const epics = combineEpics(
  startTimerEpic,
  setupBotEpic,
  tickHandsupEpic
)