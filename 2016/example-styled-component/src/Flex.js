import React from 'react'

import styled from 'styled-components';

const Row = styled.div`
  display: flex;
`
const Col = styled.div`
  display: flex;
  flex-direction: column;
`

const Child = styled.div`
  border: 1px solid black;
  flex: 1;
`
export default () => {
  return <Col>
    <Child>This is Title</Child>
    <Child>
      <Row>
        <Child>left</Child>
        <Child>right</Child>
      </Row>
    </Child>
  </Col>
}