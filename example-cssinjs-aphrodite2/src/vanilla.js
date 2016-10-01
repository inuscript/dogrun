export const bind = (styles) => {
  const styleEl = document.createElement('style')
  document.head.appendChild(styleEl)
  Object.keys(styles).map( (className) => {
    const styl = styles[className]
    
  })
}