const { Observable } = require("rxjs/Observable")
const expect = require("expect")
const axios = require("axios")
const configureMockStore = require('redux-mock-store').default

require("rxjs")

const { createEpicMiddleware } = require('redux-observable')



const assertAction = (targetEpic, dispatchAction, expectAction, cb) => {
  const _epicMiddleware = createEpicMiddleware(targetEpic);
  const _mockStore = configureMockStore([_epicMiddleware]);

  const store = _mockStore();
  store.dispatch(dispatchAction)
  const unsubscribe = store.subscribe( () => {
    expect(store.getActions()).toEqual(expectAction)
    unsubscribe()
    cb()
  })
}

///////////////

const payload = { id: 123 };


const mockAdapter = (config) => {
  return new Promise((resolve, reject) => {
    resolve({data: payload, status: 200 })
  })
}

const fakeApi = axios.create({
  adapter: mockAdapter
})

const FETCH_USER = "FETCH_USER"
const FETCH_USER_FULFILLED = "FETCH_USER_FULFILLED"

const fetchUserFulfilled = payload => {
  return { type: FETCH_USER_FULFILLED, payload }
}

const fetchUserEpic = action$ => {
  return action$.ofType(FETCH_USER)
    .mergeMap(action =>
      Observable.fromPromise(fakeApi.get(`/api/users/${action.payload}`))
        .map( ({ data }) => {
          return fetchUserFulfilled(data)
        })
      )
}
const epicMiddleware = createEpicMiddleware(fetchUserEpic);
const mockStore = configureMockStore([epicMiddleware]);

describe('fetchUserEpic', () => {

  it.only('produces the user model', (done) => {
  //   うまくいかないパターン。
    const store = mockStore();
    store.dispatch({ type: FETCH_USER })
    process.nextTick( () => {
      console.log(store.getActions())
      expect(store.getActions()).toEqual([
        { type: FETCH_USER },
        { type: FETCH_USER_FULFILLED, payload }
      ])
      done()
    })
  })
})