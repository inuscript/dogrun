require("rxjs")
const { Observable, Subject } = require("rxjs")
const { ActionsObservable, combineEpics, createEpicMiddleware } = require("redux-observable")
const configureMockStore = require('redux-mock-store').default

const fetchBook = (id) => new Promise( (res) => res({
  data: {
    id,
    title: "吾輩は猫である",
    author: "夏目漱石"
  }
}))

const fetchAuthor = (name) => new Promise( (res) => res({
  data: {
    name,
    birthday: "1867-02-09"
  }
}))

// const fetchBookAndAuthor = (action$) => 
//   action$.ofType("FETCH_BOOK_REQUEST")
//     .mergeMap( action => fetchBook(action.id) )
//     .map( response => response.data )
//     .mergeMap( data => Observable.merge(
//       Observable.of({
//         type: "FULLFILLED_BOOK",
//         data
//       }),
//       Observable.fromPromise(fetchAuthor(data.author) )
//         .map( response => response.data )
//         .map( data => ({
//           type: "FULLFILLED_AUTHOR",
//           data
//         }))
//     ))
const fetchBookEpic = (action$) => 
  action$.ofType("FETCH_BOOK_REQUEST")
    .mergeMap( action => fetchBook(action.id) )
    .map( response => ({
      type: "FULLFILLED_BOOK",
      data: response.data
    }))

const requestAuthorEpic = (action$) => 
  action$.ofType("FULLFILLED_BOOK")
    .map(({data}) => ({
      type: "FETCH_AUTHOR_REQUEST",
      author: data.author
    }))

const fetchAuthorEpic = (action$) => 
  action$.ofType("FETCH_AUTHOR_REQUEST")
    .mergeMap(action => fetchAuthor(action.author) )
    .map( response => ({
      type: "FULLFILLED_AUTHOR",
      data: response.data
    }))

const rootEpic = combineEpics(
  fetchBookEpic,
  requestAuthorEpic,
  fetchAuthorEpic
)

const epicMiddleware = createEpicMiddleware(rootEpic);
const mockStore = configureMockStore([epicMiddleware]);

const testHelper = (epic) => {
  const subject = new Subject()
  const actions$ = new ActionsObservable(subject)
  
  // emulate action loop
  epic(actions$).subscribe(v => subject.next(v))
  // kick
  return subject
}

describe("",() => {
  it("", (done) => {
    const initialActions = []
    const subject = testHelper(rootEpic)

    // kick
    subject.next({
      type: "FETCH_BOOK_REQUEST",
      id: 100
    })

    subject
      .take(3)
      .toArray()
      .toPromise()
      .then( actions => {
        console.log(actions)
        return done()
      })
  })
})