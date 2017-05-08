// require("rxjs")
// const fetchEpic = (action$) => action$
//   .ofType("FETCH")
//   .mergeMap(action => fetchApi())
//   .map( data => ({ type: "FULLFILED", data}) )

// const fetchEpic = (action$) => action$
//   .ofType("FETCH")
//   .mergeMap(action => fetchApi())
//   .do( data => console.log(data) ) // データ来てるか確認出来る
//   .map( data => ({ type: "FULLFILED", data}) )

// const fetchEpic = (action$) => action$
//   .ofType("FETCH")
//   .mergeMap(action => fetchApi())
//   .do( data => console.log(data) ) // データ来てるか確認出来る
//   .map( data => ({ type: "FULLFILED", data}) )
//   .ignoreElements() // このepicは無かったことにする

// describe.skip("", () => {
//   it("", () =>{

//   })
// })