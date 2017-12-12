import { map, switchMap } from "rxjs/operators"
import { ActionsObservable } from "redux-observable";
import { Subject } from "rxjs/Subject";

export const observableMiddleware = (rootEpic) => {
  const input$ = new Subject()
  const action$ = new ActionsObservable(input$)
  const epic$ = new Subject()
  let store
  return (_store) => (next) => {
    store = _store
    epic$.pipe(
      map(epic => {
        const output$ = epic(action$)
        return output$
      }),
      switchMap( output$ => output$ )
    ).subscribe((state) => {
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