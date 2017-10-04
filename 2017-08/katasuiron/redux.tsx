import { connect } from "react-redux"

interface Props {
  item: string[]
}

const mapStateToProps  = () => {
  return {
    foo: "baz"
  }
}

const Connected = connect(mapStateToProps)( (props) => {
  return <div>{props.item}</div>
})

