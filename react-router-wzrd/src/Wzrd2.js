import React, { Component } from 'react'

import Router from 'react-router/BrowserRouter'



export default () => {
  return <Router>
    <div>
      <Match pattern="/" exactly component={First} />
    </div>
  </Router>
}