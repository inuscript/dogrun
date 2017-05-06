const { Subject } = require("rxjs")
const { ActionsObservable } = require("redux-observable")

const testSubject = (epic) => {
  const subject = new Subject()
  const actions$ = new ActionsObservable(subject)
  
  // emulate action loop
  epic(actions$).subscribe(v => subject.next(v))
  return subject
}

module.exports = testSubject