require("rxjs")
const { Observable } = require("rxjs")
const { ActionsObservable, combineEpics } = require("redux-observable")

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
    .mergeMap( data => Observable.merge(
      Observable.of({
        type: "FULLFILLED_BOOK",
        data
      }),

      Observable.of({
        type: "FETCH_AUTHOR_REQUEST",
        author: data.author
      })
    ))

const fetchAuthorEpic = (action$) => 
  action$.ofType("FETCH_AUTHOR_REQUEST")
    .mergeMap(action => fetchAuthor(action.author) )
    .map( response => response.data )
    .map( data => ({
      type: "FULLFILLED_AUTHOR",
      data
    }))

const someLoading = combineEpics(
  fetchBookEpic,
  fetchAuthorEpic
)

describe("",() => {
  it("",(done) => {
    const input$ = ActionsObservable.of({
      type: "FETCH_BOOK_REQUEST",
      id: 100
    })
    return someLoading(input$)
      .toArray()
      .subscribe(result => {
        console.log(result)
        done()
      })
  })
})