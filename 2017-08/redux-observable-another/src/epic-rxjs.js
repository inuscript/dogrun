import { combineEpics, createEpicMiddleware } from "redux-observable"
import { changeNumber } from "./action"
import Rx from "rxjs/Rx" // needs

// epics
const randomEpic = (action$) => {
  return action$
    .filter((action) => {
      return action.type === "RANDOM"
    })
    .map((action) => {
      return changeNumber(Math.random())
    })
}

const pongEpic = (action$) => action$
  .filter(({type}) => type === "PING")
  .mapTo({
    type: "PONG"
  })

const timerEpic = () => {
  return Rx.Observable.interval(1000).map(time => ({
    type: "INTERVAL",
    payload: time
  }))
}

// middleware
const epics = combineEpics(randomEpic, timerEpic)
export const middleware = createEpicMiddleware(epics)

