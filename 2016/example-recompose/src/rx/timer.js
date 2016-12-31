import React, { Component } from 'react'
import { 
  withState, compose, withHandlers, componentFromStream, mapPropsStream, setObservableConfig
} from 'recompose'
import rxjsconfig from 'recompose/rxjsObservableConfig'
import { Observable } from '@reactivex/rxjs'
// 
setObservableConfig(rxjsconfig)


const TimerView = ({time}) => {
  return <div>time: {time}</div>
}

const enhance = mapPropsStream(props$ => {
  console.log(props$)
  const timeElapsed$ = Observable.interval(1000) //.take(4)
  return props$.combineLatest(timeElapsed$, (props, timeElapsed) => { // = propsToVdom
    console.log(timeElapsed)
    let item = Object.assign({}, props, {timeElapsed})
    return item

  })
  // }).map( ({timeElapsed}) => <div>{timeElapsed.toString()}</div> )
})

const Timer = enhance(({ timeElapsed }) =>
  <TimerView time={timeElapsed} />
)

export default Timer