import { combineEpics, createEpicMiddleware } from "redux-observable"
import { changeNumber } from "./action"
import { from } from 'rxjs/observable/from'
console.log("plain")

class MyObserver {
  constructor(destination){
    this.destination = destination
  }
  next(value){
    this.destination.next(value)
  }
  error(err) {
    this.destination.error(err)
  }
  complete(){
    this.destination.complete()
  }
}

class MyObservable {
  constructor(_subscribe) {
    this._subscribe = _subscribe;
  }
  subscribe(observer) {
    const myObserver = new MyObserver(observer);
    this._subscribe(myObserver)
  }
  filter(fn){
    return new MyObservable(observer => {
      const filter = {
        next: (x) => {
          console.log(x)
          return observer.next(fn(x))
        },
        complete: () => observer.complete
      }
      return this.subscribe(filter)
    }) 
  }
  map(fn){
    return new MyObservable(observer => {
      const mapObserver = {
        next: (x) => observer.next(fn(x)),
        complete: () => observer.complete
      }
      return this.subscribe(mapObserver)
    })
  }
}

// epics
const randomEpic = (action$) => {
  return action$
    // .filter((action) => {
    //   console.log(action)
    //   return action.type === "RANDOM"
    // })
    .map((action) => {
      return changeNumber(Math.random())
    })
}
// middleware
const epics = combineEpics(randomEpic)
export const middleware = createEpicMiddleware(epics, {
  adapter: {
    input : input$ => {
      return new MyObservable(observer => {
        console.log(observer)
        input$.next(observer.next)
        input$.error(observer.error)
        input$.complete(observer.complete)
      })
    },
    output : output$ => from(output$)
  }
})