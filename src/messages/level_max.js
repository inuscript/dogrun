const Message = ({background, color, msg}) => {
  let style = { 
    background, color,
    border: `${color} solid 1px`,
    borderRadius: 4,
    padding: 10,
    marginBottom: 5
  }
  return <div style={style}>{msg}</div>
}

const messageEnhancer = defaultProps({color: "#31708f", background: "#d9edf7"})
const DefaultMessage = messageEnhancer(Message)

// very simple 

// very simple 
const DefaultMessageRaw = (props) => {
  const defaultProps = {color: "#31708f", background: "#d9edf7"}
  const msgProps = Object.assign({}, defaultProps, props)
  return (<Message {...msgProps} /> )
}

const errorEnhance = withProps({color: "#a94442", background: "#f2dede"})
const ErrorMsg = errorEnhance(Message)

// errorMsg(raw)
// const ErrorMsg = ({msg}) => (<Message msg={msg} color={"#a94442"} background={"#f2dede"} /> )

const warnEnhance = withProps({color: "#8a6d3b", background: "#fcf8e3"})
const WarnMsg = warnEnhance(Message)

const levelEnhancer = mapProps( (props) => {
  let schema = {
    error: {color: "#a94442", background: "#f2dede"},
    warn: {color: "#8a6d3b", background: "#fcf8e3"}
  }
  if(schema[props.level]){
    return Object.assign({}, props, schema[props.level])
  }
  return props
})

const exampleEnhancer = (title, cmp) => {
  const ErrSample = withProps({level: "error", msg: "level = error"})(cmp)
  const WarnSample = withProps({level: "warn", msg: "level = warn"})(cmp)
  const DefaultSample = withProps({msg: "level = null(default)"})(cmp)
  const component = (
    <div>
      <div>{title}</div>
      <ErrSample />
      <WarnSample />
      <DefaultSample />
    </div>
  )
  // return functional stateless component
  return () => component
}

const LevelMsg = compose(messageEnhancer, levelEnhancer)(Message)

