require("rxjs")
const { Observable } = require("rxjs")
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
    .map( response => response.data )
    .map( data => ({
        type: "FULLFILLED_BOOK",
        data
      })
    )

const fetchAuthorWhenBookFullfilledEpic = (action$) => 
  action$.ofType("FULLFILLED_BOOK")
    .map(data => ({
        type: "FETCH_AUTHOR_REQUEST",
        author: data.author
      })
    )

const fetchAuthorEpic = (action$) => 
  action$.ofType("FETCH_AUTHOR_REQUEST")
    .mergeMap(action => fetchAuthor(action.author) )
    .map( response => response.data )
    .map( data => ({
      type: "FULLFILLED_AUTHOR",
      data
    }))

const rootEpic = combineEpics(
  fetchBookEpic,
  fetchAuthorWhenBookFullfilledEpic,
  fetchAuthorEpic
)

const epicMiddleware = createEpicMiddleware(rootEpic);
const mockStore = configureMockStore([epicMiddleware]);

describe("",() => {
  it("",(done) => {
    const input$ = ActionsObservable.of({
      type: "FETCH_BOOK_REQUEST",
      id: 100
    })
    rootEpic(input$)
      .next( v => console.log(v))
  })
})