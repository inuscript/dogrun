const React = require('react')
const { withState } = require('recompose')

const Count = ({count, setCounter}) => {
  let handle = () => setCounter(n => n + 1)
  return <div>
    <button onClick={handle} >{count}</button>
  </div>
}
const enhancer = withState('count', 'setCounter', 0)
module.exports = enhancer(Count)