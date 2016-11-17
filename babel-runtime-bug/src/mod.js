import React, { PropTypes } from 'react'
const style = {}

export const ThreeSplitLayout = ({ children }) => {
  const [left, center, right] = children
  return (
    <div className={style.threeParent}>
      <div className={style.threeLeft}>
        {left}
      </div>
      <div className={style.threeCenter}>
        {center}
      </div>
      <div className={style.threeRight}>
        {right}
      </div>
    </div>
  )
}

ThreeSplitLayout.propTypes = {
  children: PropTypes.array.isRequired
}

export default ThreeSplitLayout