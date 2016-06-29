import React from 'react'
import componentFromStream from 'recompose/componentFromStream'
import createEventHandler from 'recompose/createEventHandler'

import setObservableConfig from 'recompose/createEventHandler'
import rxjsconfig from 'recompose/rxjsObservableConfig'
import { Observable } from '@reactivex/rxjs'

setObservableConfig(rxjsconfig)

// Stream of vdom
// vdom$ = config.toESObservable(propsToVdom(this.props$));

const Counter = componentFromStream(props$ => {
  const { handler: increment, stream: increment$ } = createEventHandler()
  const { handler: decrement, stream: decrement$ } = createEventHandler()
  // const count$ = Observable.merge(
  //     increment$.mapTo(1),
  //     decrement$.mapTo(-1)
  //   )
  //   .startWith(0)
  //   .scan((count, n) => count + n, 0)
  console.log(props$)
  return Observable.of(<div>rx observable</div>)
  // return props$.combineLatest(
  //   count$,
  //   (props, count) =>
  //     <div {...props}>
  //       Count: {count}
  //       <button onClick={increment}>+</button>
  //       <button onClick={decrement}>-</button>
  //     </div>
  // )
})

export default () => {
  return <Counter />
}