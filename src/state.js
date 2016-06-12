const React = require('react')
const { withState, compose, withHandlers } = require('recompose')

const Count = ({count, onClick}) => {
  return <div>
    <button onClick={onClick} >{count}</button>
  </div>
}
const enhancer = compose(
  withState('count', 'setCounter', 0),
  withHandlers({
    onClick: ({count, setCounter}) => ev => {
      setCounter(count => {
        return count + 1
      })
    }
  })
)
module.exports = enhancer(Count)