import 
import branch from 'recompose/branch'
import renderComponent from 'recompose/renderComponent'

const 

const withBreakpoint = branch(
  () => true,
  t => t,
  renderComponent()
)