import { combineEpics, createEpicMiddleware } from "redux-observable"
import { changeNumber } from "./action"
import { from } from 'rxjs/observable/from'
console.log("plain")

class MyObserver {
  constructor(destination){
    this.destination = destination
  }
  next(value) {
    // only try to next if you're subscribed have a handler
    if (!this.isUnsubscribed && this.destination.next) {
      try {
        this.destination.next(value);
      } catch (err) {
        // if the provided handler errors, teardown resources, then throw
        this.unsubscribe();
        throw err;
      }
    }
  }
  
  error(err) {
    // only try to emit error if you're subscribed and have a handler
    if (!this.isUnsubscribed && this.destination.error) {
      try {
        this.destination.error(err);
      } catch (e2) {
        // if the provided handler errors, teardown resources, then throw
        this.unsubscribe();
        throw e2;
      }
      this.unsubscribe();
    }
  }

  complete() {
    // only try to emit completion if you're subscribed and have a handler
    if (!this.isUnsubscribed && this.destination.complete) {
      try {
        this.destination.complete();
      } catch (err) {
        // if the provided handler errors, teardown resources, then throw
        this.unsubscribe();
        throw err;
      }
      this.unsubscribe();
    }
  }
  unsubscribe() {
    this.isUnsubscribed = true;
    if (this.unsub) {
      this.unsub();
    }
  }
}

class MyObservable {
  constructor(_subscribe) {
    this._subscribe = _subscribe;
  }
  subscribe(observer) {
    const safeObserver = new MyObserver(observer);
    safeObserver.unsub = this._subscribe(safeObserver);
    return safeObserver.unsubscribe.bind(safeObserver);
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
      const myObs = new MyObservable(observer => {
        console.log("subs")
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