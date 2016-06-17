const React = require('react')
const { compose, defaultProps, mapProps, withProps, renderComponent, createEagerComponent } = require('recompose')
const recompose = require('recompose')
const LevelMessage1 = require('./level1')
const LevelMessage2 = require('./level2')


const Main = () => {
  // let LevelMsgSample = exampleEnhancer("LevelMsg", LevelMsg)
  // let Sample1 = exampleEnhancer("sample1", LevelMessage1)
    // <LevelMsgSample />
    // <Sample1 />

  return (<div>
    <DefaultMessage msg={"Default"} />
    <DefaultMessage msg={"Default with green"} color={"orange"} background={"purple"} />
    <DefaultMessageRaw msg={"Default with green"}  />
    <DefaultMessageRaw msg={"Default with green"} color={"orange"} background={"purple"} />
    <ErrorMsg msg={"Error!!!"} />
    <WarnMsg msg={"Warn!!!"} />
  </div>)
}

module.exports = Main