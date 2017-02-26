import "rxjs" 
import { patchApi } from "../api"
import { ActionsObservable, combineEpics } from "redux-observable"
import { Observable } from "rxjs"
import test from "ava"

function mySimpleOperator() {
   return ActionsObservable.create(subscriber => {
     var source = this;

     var subscription = source.subscribe(value => {
       try {
         subscriber.next({type: "CUSTOM_FOO"});
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

// const $$myOperatorSymbol = Symbol("myOperator")
ActionsObservable.prototype.mySimpleOperator = mySimpleOperator

const patchEpicBase = (action$, store) =>
  action$.ofType("PATCH")
    .mergeMap((action) => patchApi() )
    .map( ({ data }) => ({type: "FULLFILL", data }) )
    
const patch2Epic= (action$, store) =>
  action$.ofType("PATCH")
    .mySimpleOperator()
    // .ignoreElements()

test((t) => {
  console.log("start")
  const seedAction$ = ActionsObservable.of({type: "PATCH"})
  const epics = combineEpics(
    patchEpicBase, 
    patch2Epic
  )
  return epics(seedAction$, {})
    .toArray()
    .toPromise()
    .then( r => {
      console.log(r)
    })
})