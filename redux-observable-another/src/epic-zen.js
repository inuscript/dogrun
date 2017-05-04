import { combineEpics, createEpicMiddleware } from "redux-observable"
import ZenObservable from "zen-observable"
import { from } from 'rxjs/observable/from'
import { changeNumber } from "./action"

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
// middleware
const epics = combineEpics(randomEpic)
export const middleware = createEpicMiddleware(epics, {
  adapter : {
    input : input$ => (new ZenObservable(obs => input$.subscribe(obs))),
    output : output$ => from(output$)
  }
})