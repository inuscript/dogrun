import { map, switchMap, mergeMap } from "rxjs/operators"
// import { ActionsObservable } from "redux-observable";
import { Subject } from "rxjs/Subject";
import { Observable } from 'rxjs/Observable'

class ZeroObservable extends Observable{
  constructor(subject) {
    super();
    this.source = subject;
  }
  lift(operator) {
    const observable = new ZeroObservable(this);
    observable.operator = operator;
    return observable;
  }
}

export const observableMiddleware = (rootEpic) => {
  const input$ = new Subject()
  const action$ = new ZeroObservable(input$)
  const epic$ = new Subject()
  let store
  return (_store) => (next) => {
    store = _store
    const subject = epic$.pipe(
      map(epic => {
        const state = store.getState()
        return epic(action$, state, store)
      }),
      switchMap( output$ => output$ )
      // switchMap( output$ => {
      //   console.log(output$)
      //   return output$
      // })
    )
    subject.subscribe(function(state){
      console.log(state)
      store.setState(state)
    })
    epic$.next(rootEpic)
    return action => {
      const result = next(action)
      input$.next({ type: action.name })
      return result
    }
  }
}