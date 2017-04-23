const expect = require("expect")
const axios = require("axios")
const { createEpicMiddleware } = require('redux-observable')
require("rxjs")

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
    .mergeMap(action => fakeApi.get(`/api/users/${action.payload}`))
    .map( ({ data }) => fetchUserFulfilled(data) )
}

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

const configureMockStore = require('redux-mock-store').default
const epicMiddleware = createEpicMiddleware(fetchUserEpic);
const mockStore = configureMockStore([epicMiddleware]);

describe('fetchUserEpic', () => {
  it('produces the user model', (done) => {
    const store = mockStore();
    store.dispatch({ type: FETCH_USER })
    const unsubscribe = store.subscribe( () => {
      expect(store.getActions()).toEqual([
        { type: FETCH_USER },
        { type: FETCH_USER_FULFILLED, payload }
      ])
      unsubscribe()
      done()
    })
  })
  it.only('XXXX produces the user model', (done) => {
    const store = mockStore();
    store.dispatch({ type: FETCH_USER })
    // const unsubscribe = 
    store.subscribe( () => {
      const actions = store.getActions()
      console.log(actions)
      // console.log(actions[actions.length - 1])
      // expect(store.getActions()).toEqual([
      //   { type: FETCH_USER },
      //   { type: FETCH_USER_FULFILLED, payload }
      // ])
      // unsubscribe()
      // done()
    })
  })
  it('produces the user model', (done) => {
    assertAction(fetchUserEpic, { type: FETCH_USER }, [
      { type: FETCH_USER },
      { type: FETCH_USER_FULFILLED, payload }
    ], done)
  })
  it('produces the user model', (done) => {
    // うまくいかないパターン。
    const store = mockStore();
    store.dispatch({ type: FETCH_USER })
    expect(store.getActions()).toEqual([
      { type: FETCH_USER }, // こっちしか来ない
      { type: FETCH_USER_FULFILLED, payload }
    ])
  })
})