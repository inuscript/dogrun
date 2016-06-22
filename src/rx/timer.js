const React = require('react')
const { Component } = React
const { 
  withState, compose, withHandlers, componentFromStream, mapPropsStream, setObservableConfig
} = require('recompose')
import rxjsconfig from 'recompose/rxjsObservableConfig'
setObservableConfig(rxjsconfig)

const Observable = require('rxjs/Observable').Observable

const TimerView = (props) => {
  let {timeElapsed} = props
  console.log(props)
  return <div>{timeElapsed}</div>
}

const enhance = mapPropsStream(props$ => {
  const timeElapsed$ = Observable.interval(1000).pluck('value')
  return props$.combineLatest(timeElapsed$, (props, timeElapsed) => {
    // console.log(props, timeElapsed)
    let item = Object.assign({}, props, {timeElapsed})
    return item
  })
  // }).map( ({timeElapsed}) => <div>{timeElapsed.toString()}</div> )
})

const Timer = enhance(({ timeElapsed }) =>
  <TimerView time={timeElapsed} />
)

export default Timer