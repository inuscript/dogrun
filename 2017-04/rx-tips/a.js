require("rxjs")
const Rx = require("rxjs")
// import { Subject } from 'rxjs/Subject';
//
// const epic$ = new Subject()
//
// const epic =
// epic$.next()

const promiseA = new Promise( (res, rej) => {
  setTimeout( () => {
    res("Foo")
  }, 100)
})
const promiseB = new Promise( (res, rej) => {
  setTimeout( () => {
    res("Baz")
  }, 500)
})

const source = Rx.Observable.of(
  promiseA,
  promiseB
)
const subscribe = source
  .zip()
  .do(a => console.log(1,a))
  .mergeMap(a => {
    return a
  })
  .do(a => console.log(2, a))
  .zip(a => a)
  .do(a => console.log(3, a))
  .subscribe(val => console.log(val));
