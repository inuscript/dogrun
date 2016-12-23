// const Rx = require('rxjs')
const { Observable } = require("rxjs/Observable")
const nock = require("nock")
const expect = require("expect")
const configureMockStore = require('redux-mock-store').default
const { createEpicMiddleware } = require('redux-observable')

require('rxjs')
require('rxjs/add/observable/of')

const payload = { id: 123 };

const fakeAjax = url =>
  Observable.of({
    id: url.substring(url.lastIndexOf('/') + 1),
    firstName: 'Bilbo',
    lastName: 'Baggins'
  })
  .delay(1000);


const FETCH_USER = "FETCH_USER"
const FETCH_USER_FULFILLED = "FETCH_USER_FULFILLED"

const fetchUserFulfilled = payload => {
  return { type: FETCH_USER_FULFILLED, payload }
}

const fetchUserEpic = action$ => {
  return action$.ofType(FETCH_USER)
    .mergeMap(action => fakeAjax(`/api/users/${action.payload}`))
    .map( ( data ) => {
      console.log(data)
      return fetchUserFulfilled(data)
    })
}
const epicMiddleware = createEpicMiddleware(fetchUserEpic);
const mockStore = configureMockStore([epicMiddleware]);
describe('fetchUserEpic', () => {
  let store;

  beforeEach(() => {
    store = mockStore();
  });

  afterEach(() => {
    nock.cleanAll();
    epicMiddleware.replaceEpic(fetchUserEpic);
  });

  it('produces the user model', () => {
    const payload = { id: 123 };
    nock('http://example.com/')
      .get('/api/users/123')
      .reply(200, payload);

    store.dispatch({ type: FETCH_USER });
    console.log(store.getActions())
    expect(store.getActions()).toEqual([
      { type: FETCH_USER },
      { type: FETCH_USER_FULFILLED, payload }
    ]);
  });
});