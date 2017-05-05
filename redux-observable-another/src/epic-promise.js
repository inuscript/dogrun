import { combineEpics, createEpicMiddleware } from "redux-observable"
// import { fromPromise } from 'rxjs/observable/fromPromise'
import { from } from 'rxjs/observable/from'
// import { toPromise } from 'rxjs/operator/toPromise'
import { Observable } from 'rxjs';
// import 'rxjs/add/operator/toPromise'

import { changeNumber } from "./action"

// epics
const randomPromise = (actionPromise) => {
  return actionPromise.then( (action) => {
    console.log("promise", action)
    if(action.type === "RANDOM"){
      return changeNumber(Math.random())
    }
    return {}
  }).catch(e => {
    // console.log(e)
  })
}

// middleware
const epics = combineEpics(randomPromise)
export const middleware = createEpicMiddleware(epics, {
  adapter : {
    // input : action$ => new Promise( (resolve, reject) => action$.subscribe((v) => resolve(v), err => reject(err))),
    input: action$ => new Observable(action$).toPromise(),
    output : promise => {
      console.log("out", promise)
      return Observable.from(promise)
    }
  }
})