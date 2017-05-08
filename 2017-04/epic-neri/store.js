const configureStore = require('redux-mock-store').default
const { createEpicMiddleware } = require("redux-observable")

const start = new Date().getTime()

const defaultLogger = store => next => action => {
  const t = new Date().getTime() - start
  console.log(t, action)
  console.log("===================")
  return next(action)
}

const createMockStore = (epics, logger = defaultLogger) => {
  const mockStore = configureStore([
    createEpicMiddleware(epics),
    logger
  ])
  return mockStore({})
}

module.exports.createMockStore = createMockStore
