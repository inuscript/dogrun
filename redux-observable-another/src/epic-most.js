import { combineEpics, createEpicMiddleware } from "redux-observable"
import mostAdapter from 'redux-observable-adapter-most'
import { from } from 'rxjs/observable/from'
import { changeNumber } from "./action"
import { ofType } from 'redux-observable-adapter-most';

// epics
const randomEpic = (action$) => {
  return action$
    .ofType("RANDOM")
    .map((action) => {
      return changeNumber(Math.random())
    })
}
// middleware
const epics = combineEpics(randomEpic)
export const middleware = createEpicMiddleware(epics, {
  adapter : mostAdapter
})