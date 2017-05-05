require("rxjs")
const { Observable } = require("rxjs")
const { ActionsObservable } = require("redux-observable")

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

const someLoading = (action$) => 
  action$.ofType("FETCH_REQUEST")
    .mergeMap( action => fetchBook(action.id) )
    .map( response => response.data )
    .mergeMap( data => Observable.merge(
      Observable.of({
        type: "FULLFILLED_BOOK",
        data
      }),
      Observable.fromPromise(fetchAuthor(data.author) )
        .map( response => response.data )
        .map( data => ({
          type: "FULLFILLED_AUTHOR",
          data
        }))
    ))

describe("",() => {
  it("",(done) => {
    const input$ = ActionsObservable.of({
      type: "FETCH_REQUEST",
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