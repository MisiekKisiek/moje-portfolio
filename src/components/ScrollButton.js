import React from 'react'

//Styles
import * as scrollButtonStyles from '../styles/scrollButton.module.scss';

const ScrollButton = ({scrollUpVisible, onclick}) => {
  return (<>
  {scrollUpVisible ? 
    (<button
    onClick={onclick}
      className={scrollButtonStyles.scrollButton} 
    >
    </button>) : null
  }</>);
}
 
export default ScrollButton;