import { map, switchMap, mergeMap } from "rxjs/operators"
// import { ActionsObservable } from "redux-observable";
import { Subject } from "rxjs/Subject";
import { Observable } from 'rxjs/Observable'

export const observableMiddleware = (rootEpic) => {
  const input$ = new Subject()
  const action$ = new Observable(input$)
  const epic$ = new Subject()
  let store
  return (_store) => (next) => {
    store = _store
    const subject = epic$.pipe(
      map(epic =>  epic(action$, store)),
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
      input$.next(action)
      return result
    }
  }
}