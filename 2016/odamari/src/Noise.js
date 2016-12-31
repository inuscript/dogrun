import React from 'react'
import { Song, Sequencer, Synth } from 'react-music'
export default () => {
  return (
    <Song tempo={90} playing={true}>
      <Sequencer resolution={16} bars={1}>
      <Synth
           type="square"
           steps={[
             [0, 2, "a30", "b7"],
             [0, 2, "a9", "a10"],
             [0, 2, "a10","b7"],
             [0, 2, "a9",],
           ]}
         />
      </Sequencer>
    </Song>
  )
}