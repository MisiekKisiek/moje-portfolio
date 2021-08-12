import React from 'react';
import ReactDOM from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';

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

const wordShow = (word) => {
  const letters = [];
  for (let i = 0; i < word.length; i++) {
    letters.push(
      <span >
        {word.charAt(i)}
      </span>
    )
    
    console.log(ReactDOM.findDOMNode())
  }
  letters.push(<FontAwesomeIcon icon={faArrowDown} />)

  letters.forEach((e)=>{
    
  })
  return letters;
}

export { projectAnimationFunction, floatProjectFunc, wordShow }