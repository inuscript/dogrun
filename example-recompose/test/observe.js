import Observable from 'zen-observable'
import assert from 'assert'
// console.log(Observable.of)
Observable.of(1, 2, 3).subscribe(x => {
  assert(1 === 1)
  console.log(x)
});