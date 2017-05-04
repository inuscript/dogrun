import { combineEpics, createEpicMiddleware } from "redux-observable"
import { changeNumber } from "./action"
import { from } from 'rxjs/observable/from'
console.log("plain")

class MyObserver {
  constructor(destination){
    this.destination = destination
  }
  next(value){
    return this.destination.next(value)
  }
  error(err) {
    return this.destination.error(err)
  }
  complete(){
    return this.destination.complete()
  }
}

class MyObservable {
  constructor(_subscribe) {
    this._subscribe = _subscribe;
  }
  subscribe(observer) {
    console.log("subscr")
    const myObserver = new MyObserver(observer);
    this._subscribe(myObserver)
  }
}
MyObservable.prototype.filter = (fn) => {
  return new MyObservable(observer => {
    const filter = {
      next: (x) => {
        if(fn(x)){
          return observer.next(x)
        }
      },
      complete: () => observer.complete
    }
    return this.subscribe(filter)
  }) 
}
MyObservable.prototype.map = (fn) => {
  return new MyObservable(observer => {
    const mapObserver = {
      next: (x) => observer.next(fn(x)),
      complete: () => observer.complete
    }
    return this.subscribe(mapObserver)
  })
}

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
  adapter: {
    input : input$ => {
      // input$.subscribe((n) => console.log("debug",n))
      const myObs = new MyObservable(observer =>{
        input$.subscribe(
          (n) => {
            console.log(n)
            return observer.next(n)
          }
        )
      })
      return myObs
    },
    output : output$ => from(output$)
  }
})