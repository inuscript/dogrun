
const patchEpic = (action$, store) =>
  action$.ofType("PATCH")
    .mergeMap( (action) => {
      return Observable.concat(
        Observable.of(startConnection(action.meta.uuid)),
        fetchEpic(ActionsObservable.of(action)),
        Observable.of(finishConnection(action.meta.uuid))
      )
    })

