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

const MMLSynth = ({mml}) => {
  let song = convertMML(mml)
  return <Synth
    type="triangle"
    steps={song}
  />
}

const Sound = ({mml, playing}) => {
  return (
    <Song tempo={160} playing={playing}>
      <Sequencer resolution={8} bars={1}>
        <MMLSynth mml={mml}/>
      </Sequencer>
    </Song>
  )
}

const Controller = ({mml, playing, onChangePlay, onChangeMML}) => {
  return (
    <div>
      <button onClick={onChangePlay}>{playing ? "pause": "play" }</button>
      <textarea onChangeMML={onChangeMML}>{mml}</textarea>
    </div>
  )
}

export default class MMLMusci extends Component{
  state = {
    mml: "e g > e c d g",
    playing: false
  }
  handleTogglePlay = () => {
    this.setState({playing: !this.state.playing})
  }
  handleChangeMML = (value) => {
    this.setState({mml: value})
  }
  render(){
    const props = {
      ...this.state,
      onChangePlay: this.handleTogglePlay,
      onChangeMML: this.handleChangeMML
    }
    return (<div>
      <Sound {...this.state}/>
      <Controller {...props}/>
    </div>)
  }
}
