import React, { Component } from 'react';
/* eslint-disable */
import {
  Analyser,
  Song,
  Sequencer,
  Sampler,
  Synth,
  Monosynth,
} from 'react-music';

import { toSteps, convertMML } from './mml'

// convertMML("cdefedcr")
// let song = toSteps([ "60", "62", "64"])

export default () => {
  // let song = convertMML("e g > e c d g")
  // let song = convertMML("e g")
  let song = toSteps([ "60", "62", "64"])
  console.log(song)
  return (
    <Song tempo={160} playing={true}>
      <Sequencer resolution={8} bars={1}>
        <Synth
          type="triangle"
          steps={song}
        />
      </Sequencer>
    </Song>
  )
}
