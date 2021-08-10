const projectAnimationFunction = (element, min) => {
  const value = min + (element.pageYOffset / window.innerHeight) * (100 - min);
  return value
}

const floatProjectFunc = () => {
  const justifyOption = Math.round(Math.random() * 4);
  switch (justifyOption) {
    case 0 || 3:
      return "left"
    case 1:
      return "right"
    case 2:
      return "none"
    default:
      return
  }
}

export { projectAnimationFunction, floatProjectFunc }