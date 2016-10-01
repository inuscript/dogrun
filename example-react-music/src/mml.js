import MMLIterator from 'mml-iterator'
export const toSteps = (notes, length = 2) => {
  return notes.map((note, i) => {
    return [
      i * length,
      length,
      note
    ]
  })
}

const mmlNoteToStep = (mmlNote) => {
  if(mmlNote.type !== 'note'){
    return
  }
  let {time, noteNumber, duration} = mmlNote
  let h = 8
  return [
    time * h ,
    duration * h,
    noteNumber.toString()
  ]
}

export const convertMML = (mml) => {
  let iter = new MMLIterator(mml)
  return Array.from(iter).map( mmlNoteToStep ).filter( i => i)
}
