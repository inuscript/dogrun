const expect = require("expect")
const { createEpicMiddleware } = require('redux-observable')
require("rxjs")

const payload = { id: 123 };

const FETCH_USER = "FETCH_USER"
const FETCH_USER_FULFILLED = "FETCH_USER_FULFILLED"

const fetchUserFulfilled = payload => {
  return { type: FETCH_USER_FULFILLED, payload }
}

const fetchUserEpic = action$ => {
  return action$.ofType(FETCH_USER)
    .delay(1000)
    .map( () => fetchUserFulfilled(payload) )
}

const configureMockStore = require('redux-mock-store').default
const epicMiddleware = createEpicMiddleware(fetchUserEpic);
const mockStore = configureMockStore([epicMiddleware]);

describe('delay', () => {
  it('produces the user model', (done) => {
    // うまくいかないパターン。
    const store = mockStore()
    store.dispatch({ type: FETCH_USER })
    console.log(store.getActions())
    expect(store.getActions()).toEqual([
      { type: FETCH_USER }, // こっちしか来ない
      { type: FETCH_USER_FULFILLED, payload }
    ])
    done()
  })
})