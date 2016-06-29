// const enhance = withState('counter', 'setCounter', 0)
// const Counter = enhance(({ counter, setCounter }) =>
//   <div>
//     Count: {counter}
//     <button onClick={() => setCounter(n => n + 1)}>Increment</button>
//     <button onClick={() => setCounter(n => n - 1)}>Decrement</button>
//   </div>
// )


const enhance = withState('counter', 'setCounter', 0)
const Counter = enhance(({ counter, setCounter }) =>
  <div>
    Count: {counter}
    <button onClick={() => setCounter(n => n + 1)}>Increment</button>
    <button onClick={() => setCounter(n => n - 1)}>Decrement</button>
  </div>
)


class Counter extends Component{
  constructor(){
    
  }
  render(){
    
  }
}