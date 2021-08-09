const projectAnimationFunction = (element, min) => {
  const value = min + (element.pageYOffset / window.innerHeight) * (100 - min);
  return value
}

export { projectAnimationFunction }