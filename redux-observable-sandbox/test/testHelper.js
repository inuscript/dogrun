const { Subject } = require("rxjs/Subject")
const { ActionsObservable } = require("redux-observable")

const testSubject = (epic) => {
  const subject = new Subject()
  const actions$ = new ActionsObservable(subject)
  
  // emulate action loop
  epic(actions$)
    // .do(a => console.log("aaa",a))
    .subscribe(
      v => subject.next(v),
      err => subject.error(err),
      () => subject.complete()
    )
  
  // return generated action
  return subject
}

module.exports = testSubject