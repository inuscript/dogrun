import "rxjs" 
import { patchApi } from "../api"
import { ActionsObservable, combineEpics } from "redux-observable"
import { Observable } from "rxjs"
import test from "ava"

function mySimpleOperator(someCallback) {
   console.log("1111111111111")
   return ActionsObservable.create(subscriber => {
     console.log("HEEEE")
     var source = this;

     var subscription = source.subscribe(value => {
       try {
         subscriber.next(someCallback(value));
       } catch(err) {
         subscriber.error(err);
       }
     },
     err => subscriber.error(err),
     () => subscriber.complete());

     // to return now
     return subscription;
   });
}

const patchEpicBase = (action$, store) =>
  action$.ofType("PATCH")
    .mergeMap((action) => patchApi() )
    .map( ({ data }) => ({type: "FULLFILL", data }) )

const patch2Epic= (action$, store) =>
  action$.ofType("PATCH")
    .lift(mySimpleOperator(a => console.log(a)))
    .ignoreElements()

test((t) => {
  console.log("start")
  const seedAction$ = ActionsObservable.of({type: "PATCh"})
  const epics = combineEpics(patchEpicBase, patch2Epic)
  return epics(seedAction$, {})
    .toArray()
    .toPromise()
    .then( r => {
      console.log(r)
    })
})