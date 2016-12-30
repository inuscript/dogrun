import React from 'react'
import { createDevTools } from 'redux-devtools';

import LogMonitor from 'redux-devtools-log-monitor'
import DockMonitor from 'redux-devtools-dock-monitor'

const DevTools = createDevTools(
  <DockMonitor defaultIsVisible={true}
    toggleVisibilityKey='ctrl-h'
    changePositionKey='ctrl-q'
    changeMonitorKey='ctrl-m'>
    <LogMonitor theme='tomorrow' />
  </DockMonitor>
)

export default DevTools