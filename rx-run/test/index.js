require("rxjs")
const { PromiseObservable } = require('rxjs/observable/PromiseObservable')

const axios = require("axios")
const configureMockStore = require('redux-mock-store').default

const { createEpicMiddleware } = require('redux-observable')

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

const epicMiddleware = createEpicMiddleware(fetchUserEpic);
const mockStore = configureMockStore([epicMiddleware]);


describe('fetchUserEpic', () => {
  let store;

  beforeEach(() => {
    store = mockStore();
  });

  afterEach(() => {
    epicMiddleware.replaceEpic(fetchUserEpic);
  });

  it('produces the user model', (done) => {
    store.dispatch({ type: FETCH_USER });
    // store.dispatch({ type: "XXX" });
    setTimeout( () => {
      console.log(store.getActions())
      done()
    }, 0)
    // expect(store.getActions()).toEqual([
    //   { type: FETCH_USER },
    //   { type: FETCH_USER_FULFILLED, payload }
    // ])
  })
})