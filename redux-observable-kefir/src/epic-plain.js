import { combineEpics, createEpicMiddleware } from "redux-observable"
import { changeNumber } from "./action"

// epics
const randomEpic = (action$) => {
  console.log(action$)
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
  adapter: {
    input : input$ => input$,
    output : output$ => from(output$)
  }
})